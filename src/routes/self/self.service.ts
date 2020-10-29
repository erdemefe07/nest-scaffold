import { Injectable } from '@nestjs/common';
import { User } from 'common/entities/postgres';

@Injectable()
export class SelfService {
  myDetails(username: string) {
    return User.findOne({ username });
  }
}
