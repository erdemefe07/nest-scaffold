import { getMongoManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LogDTO } from './dtos/Log.dto';
import { Log } from 'common/entities/mongo';

@Injectable()
export class LogService {
  private Log = getMongoManager('mongo');

  saveLog(log: LogDTO) {
    return this.Log.save(new Log(log));
  }
}
