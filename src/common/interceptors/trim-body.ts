/* eslint-disable @typescript-eslint/ban-types */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export abstract class TrimBody implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.cleanBody(context.switchToHttp().getRequest());
    return next.handle();
  }

  cleanBody(req: any): void {
    if (req.method !== 'GET') {
      req.body = this.cleanObject(req.body);
    }
  }

  cleanObject(obj: object | null | undefined) {
    if (!obj) {
      return obj;
    }

    for (const key in obj) {
      const value = obj[key];
      if (value instanceof Object) {
        this.cleanObject(value);
      } else {
        obj[key] = this.transform(key, value);
      }
    }

    return obj;
  }

  abstract transform(key: string | number, value: boolean | number | string | null | undefined): any;
}
