export interface PgError {
  code: string;
  detail?: string;
  constraint?: string;
  table?: string;
  driverError?: {
    code: string;
    detail?: string;
    constraint?: string;
    table?: string;
  };
}
