import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('space-trackin-webhook');

export interface TraceOptions {
  spanName?: string;
  attributes?: Record<string, string | number | boolean>;
}

/**
 * Decorator para instrumentar métodos de controller com tracing
 */
export function Trace(options: TraceOptions = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const spanName = options.spanName || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: any[]) {
      const span = tracer.startSpan(spanName, {
        attributes: {
          'function.name': propertyKey,
          'class.name': target.constructor.name,
          ...options.attributes,
        },
      });

      // Adiciona informações da Request se disponível
      const [req] = args;
      if (req && req.method && req.path) {
        span.setAttribute('http.method', req.method);
        span.setAttribute('http.path', req.path);
        span.setAttribute('http.url', req.originalUrl || req.url);
        span.setAttribute('http.ip', req.ip || 'unknown');
        span.setAttribute('http.user_agent', req.get('user-agent') || 'unknown');
        
        // Adiciona body da requisição (cuidado com dados sensíveis)
        if (req.body && Object.keys(req.body).length > 0) {
          // Filtrar campos sensíveis
          const sanitizedBody = { ...req.body };
          delete sanitizedBody.password;
          delete sanitizedBody.token;
          span.setAttribute('http.request.body', JSON.stringify(sanitizedBody));
        }
        
        // Adiciona query params
        if (req.query && Object.keys(req.query).length > 0) {
          span.setAttribute('http.request.query', JSON.stringify(req.query));
        }
        
        // Adiciona params de rota
        if (req.params && Object.keys(req.params).length > 0) {
          span.setAttribute('http.request.params', JSON.stringify(req.params));
        }
      }

      const activeContext = trace.setSpan(context.active(), span);

      try {
        let result: any;
        
        await context.with(activeContext, async () => {
          result = await originalMethod.apply(this, args);
        });

        span.setStatus({ code: SpanStatusCode.OK });
        span.addEvent('Request processed successfully');
        
        return result;
      } catch (error: any) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        
        span.recordException(error);
        span.setAttribute('error.type', error.constructor?.name || 'Error');
        span.setAttribute('error.message', error.message || 'Unknown error');
        span.setAttribute('error.stack', error.stack || '');

        throw error;
      } finally {
        span.end();
      }
    };

    return descriptor;
  };
}
