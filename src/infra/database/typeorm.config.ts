import { DataSource } from "typeorm";
import { Login } from "./entities/login.entity";
import { User } from "./entities/user.entity";
import { File } from "./entities/file.entity";
import { configs } from "../../configs/configs";

export const typeormConfig = new DataSource({
  type: "postgres",
  host: configs.database.host,
  port: configs.database.port,
  username: configs.database.username,
  password: configs.database.password,
  database: configs.database.database,
  entities: [
    File,
    Login,
    User,
  ],
  synchronize: configs.database.synchronize,
  logging: configs.database.logging,
  migrations: ["src/shared/infra/database/migrations/*.ts"],
  migrationsRun: configs.database.migrationsRun,
});
