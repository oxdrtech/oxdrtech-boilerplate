import multer from 'multer';
import { ResFailedException } from '../errs';

export function uploadFiles() {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: (_req, file, cb) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/svg+xml',
        'application/pdf',
        'text/plain',
        'application/json',
      ];

      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new ResFailedException([`O formato '${file.mimetype}' não é permitido`]));
      }
    }
  });
}
