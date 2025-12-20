import { Client } from 'minio';
import { Readable } from 'stream';
import { minioConfig } from './minio.config';
import { configs } from '../../shared/configs/configs';

export class MinioService {
  private static client: Client;
  private static bucketName = configs.minio.bucket;

  static async initialize() {
    try {
      this.client = new Client(minioConfig);
      console.log('📂 MinIO inicializado com sucesso');
    } catch (error) {
      console.error('🔴 Erro ao inicializar MinIO:', error);
      process.exit(1);
    }
  }

  static getClient() {
    if (!this.client) {
      throw new Error('MinIO não foi inicializado');
    }
    return this.client;
  }

  private static normalizeBucketName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .substring(0, 63);
  }

  static async ensureBucketExists(bucket: string): Promise<void> {
    const normalizedBucket = this.normalizeBucketName(bucket);
    const client = this.getClient();
    const exists = await client.bucketExists(normalizedBucket);
    if (!exists) {
      await client.makeBucket(normalizedBucket, 'us-east-1');
      await this.setBucketPublic(normalizedBucket);
    }
  }

  static async setBucketPublic(bucket: string): Promise<void> {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucket}/*`],
        },
      ],
    };

    await this.client.setBucketPolicy(bucket, JSON.stringify(policy));
  }

  static async upload(
    objectName: string,
    file: Buffer | Readable,
    fileSize: number,
    contentType: string
  ) {
    try {
      const normalizedBucket = this.bucketName;
      await this.ensureBucketExists(normalizedBucket);
      await this.client.putObject(normalizedBucket, objectName, file, fileSize, {
        'Content-Type': contentType,
      });

      return `${configs.minio.endPoint}/${normalizedBucket}/${objectName}`;
    } catch (error) {
      console.error('🔴 Erro no upload do arquivo:', error);
      throw error;
    }
  }

  static async delete(objectName: string) {
    try {
      const normalizedBucket = this.bucketName;
      await this.client.removeObject(normalizedBucket, objectName);
    } catch (error) {
      console.error('🔴 Erro ao deletar arquivo:', error);
      throw error;
    }
  }
}
