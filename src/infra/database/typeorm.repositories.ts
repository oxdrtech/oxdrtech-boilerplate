import { typeormConfig } from "./typeorm.config";

import { File } from "./entities/file.entity";
import { Login } from "./entities/login.entity";
import { User } from "./entities/user.entity";

export const FileRepository = typeormConfig.getRepository(File);
export const LoginRepository = typeormConfig.getRepository(Login);
export const UserRepository = typeormConfig.getRepository(User);
