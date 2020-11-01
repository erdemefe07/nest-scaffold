import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'common/dtos';
import { UnAutharizedErrorFilter } from 'common/filters/unautharized-error.filter';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  @UseFilters(UnAutharizedErrorFilter)
  login(@Body() body: LoginDTO): Promise<{ access_token }> {
    return this.appService.login(body);
  }

  @Post('/register')
  register(@Body() body: RegisterDTO): Promise<null> {
    return this.appService.register(body);
  }
}
