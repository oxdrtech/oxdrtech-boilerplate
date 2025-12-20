import { ClientOptions } from "minio";
import { configs } from "../../shared/configs/configs";

const normalizeUrl = (url: string): string => {
  let cleaned = url.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  if (cleaned.startsWith('localhost')) return 'localhost';
  return cleaned;
}

export const minioConfig: ClientOptions = {
  endPoint: normalizeUrl(configs.minio.endPoint),
  port: configs.minio.port,
  useSSL: configs.minio.useSSL,
  accessKey: configs.minio.accessKey,
  secretKey: configs.minio.secretKey,
};
