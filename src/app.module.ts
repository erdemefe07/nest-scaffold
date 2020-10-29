import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from 'services/auth/auth.module';
import { SelfModule } from 'routes/self/self.module';
import { LogModule } from './services/log/log.module';
import { mongoConfig, postgresConfig } from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConfig),
    TypeOrmModule.forRoot(mongoConfig),
    AuthModule,
    SelfModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule { }
