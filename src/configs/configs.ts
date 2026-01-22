export const configs = {
  project: {
    name: process.env.PROJECT_NAME || 'oxdrtech-boilerplate',
    description: process.env.PROJECT_DESCRIPTION || 'project_description',
    owner: process.env.PROJECT_OWNER || 'oxdrtech',
    builder: process.env.PROJECT_BUILDER || 'https://github.com/oxdrtech',
    port: Number(process.env.PROJECT_PORT) || 8080,
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "postgres",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    migrationsRun: process.env.DB_MIGRATIONS_RUN === "true",
  },

  minio: {
    endPoint: process.env.MINIO_SERVER_URL || "http://localhost:9000",
    accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
    secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
    bucket: process.env.MINIO_BUCKET || 'oxdrtech-boilerplate',
    port: Number(process.env.MINIO_PORT) || 9000,
    useSSL: process.env.MINIO_USE_SSL === "true",
  },

  jaeger: {
    endpoint: process.env.JAEGER_ENDPOINT || "http://localhost:4318/api/traces",
    serviceName: process.env.JAEGER_SERVICE_NAME || "oxdrtech-boilerplate",
    serviceVersion: process.env.JAEGER_SERVICE_VERSION || "1.0.0",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secretKeyDevelopment123",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    reset_expiresIn: process.env.JWT_RESET_EXPIRES_IN || "15m",
    issuer: process.env.JWT_ISSUER || "your-app-name",
    audience: process.env.JWT_AUDIENCE || "users"
  },
};
