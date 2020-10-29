import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from 'dotenv'
config()

export const mongoConfig: TypeOrmModuleOptions = {
    name: 'mongo',
    type: 'mongodb',
    port: Number(process.env.mongo_port),
    host: process.env.mongo_host,
    database: process.env.mongo_database,
    entities: ['dist/common/entities/mongo/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    useUnifiedTopology: true,
}