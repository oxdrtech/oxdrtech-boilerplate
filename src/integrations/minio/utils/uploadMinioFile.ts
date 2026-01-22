import { FileRepository } from "../../../infra/database/typeorm.repositories";
import { generateFileName } from "../../../shared/utils/generateFileName";
import { MinioService } from "../minio.service";


export async function uploadMinioFile(
  folder: string,
  file?: Express.Multer.File
) {
  if (!file) return undefined;

  const fileName = `${folder}/${generateFileName(file)}`;
  const url = await MinioService.upload(
    fileName,
    file.buffer,
    file.size,
    file.mimetype
  );

  const fileEntity = FileRepository.create({ fileName: url });
  const savedFile = await FileRepository.save(fileEntity);

  return savedFile.id;
}