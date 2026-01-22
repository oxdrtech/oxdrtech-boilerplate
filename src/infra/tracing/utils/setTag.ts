import { trace } from "@opentelemetry/api";

export function setTag(key: string, value: string | number | boolean) {
  const activeSpan = trace.getActiveSpan();
  if (activeSpan) {
    activeSpan.setAttribute(key, value);
  }
}
