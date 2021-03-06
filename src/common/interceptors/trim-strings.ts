import { Injectable } from '@nestjs/common';
import { TrimBody } from './trim-body';

@Injectable()
export class TrimStrings extends TrimBody {
  private except = ['Password', 'password', 'currentPassword', 'newPassword'];

  transform(key: string | number, value: any) {
    if (this.isString(value) && this.isString(key) && !this.except.includes(key)) {
      return value.trim();
    }

    return value;
  }

  isString(value: any): value is string {
    return typeof value === 'string' || value instanceof String;
  }
}
