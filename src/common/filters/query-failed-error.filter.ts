import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { LogService } from 'services/log/log.service';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  private logService: LogService;

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const request = {
      method: req.method,
      headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl,
      cookies: req.cookies,
      ip: req.ip,
    };

    switch (exception['code']) {
      case '23505':
        const error = {
          statusCode: HttpStatus.CONFLICT,
          message: 'Hali hazırda var olan anahtar',
          details: exception['detail'].replace(/\"/g, ''),
        };

        return res.status(HttpStatus.CONFLICT).json(error);
      default:
        this.logService.saveLog({
          type: 'QueryFailedError',
          detail: 'DenemeDetails',
          exception,
          req: request,
        });

        return res.status(500).json('Sistemsel bir hata meydana geldi');
    }
  }
}
