import { Get, Controller, UseGuards, Post, Body } from '@nestjs/common';
import { User as UserData } from 'common/decorators';
import { ResetPasswordDTO } from 'common/dtos';
import { User } from 'common/entities/postgres';
import { AuthGuard } from 'services/auth/auth.guard';
import { SelfService } from './self.service';

@UseGuards(AuthGuard)
@Controller('self')
export class SelfController {
  constructor(private selfService: SelfService) {}

  @Get('/')
  myDetails(@UserData() user: User) {
    return this.selfService.myDetails(user.username);
  }

  @Post('/resetPassword')
  resetPassword(@UserData() user: User, @Body() body: ResetPasswordDTO) {
    return this.selfService.resetPassword(user.username, body);
  }
}
