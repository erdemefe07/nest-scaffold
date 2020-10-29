import { SelfService } from './self.service';
import { SelfController } from './self.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SelfController],
  providers: [SelfService],
})
export class SelfModule { }
