import { randomUUID } from 'crypto';
import * as path from 'path';

export function generateFileName(file: Express.Multer.File) {
  const ext = path.extname(file.originalname);
  return `${randomUUID()}${ext}`;
};
