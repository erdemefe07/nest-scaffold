import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from 'dotenv'
config()

export const postgresConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.psql_username,
    password: process.env.psql_password,
    port: Number(process.env.psql_port),
    host: process.env.psql_host,
    database: process.env.psql_database,
    entities: ['dist/common/entities/postgres/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
}