import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { configs } from '../../configs/configs';

export class TracerService {
  private static sdk: NodeSDK;

  static async initialize() {
    try {
      const traceExporter = new OTLPTraceExporter({
        url: configs.jaeger.endpoint,
      });

      this.sdk = new NodeSDK({
        resource: new Resource({
          [ATTR_SERVICE_NAME]: configs.jaeger.serviceName,
          [ATTR_SERVICE_VERSION]: configs.jaeger.serviceVersion,
        }),
        traceExporter,
        instrumentations: [
          getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-http': {
              enabled: true,
            },
            '@opentelemetry/instrumentation-express': {
              enabled: true,
            },
            '@opentelemetry/instrumentation-pg': {
              enabled: true,
            },
          }),
        ],
      });

      this.sdk.start();
      console.log('✨============================================✨');
      console.log('✅ Tracing');

      // Shutdown graceful do SDK
      process.on('SIGTERM', () => {
        this.shutdown();
      });
    } catch (error) {
      console.error('🔴 Erro ao inicializar tracing com Jaeger:', error);
      process.exit(1);
    }
  }

  static async shutdown() {
    if (this.sdk) {
      await this.sdk.shutdown()
        .then(() => console.log('📊 Tracing finalizado'))
        .catch((error) => console.error('🔴 Erro ao finalizar tracing', error))
        .finally(() => process.exit(0));
    }
  }

  static getSDK() {
    if (!this.sdk) {
      throw new Error('TracerService não foi inicializado');
    }
    return this.sdk;
  }
}
