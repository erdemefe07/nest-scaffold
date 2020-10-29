import { Get, Controller, UseGuards } from '@nestjs/common';
import { User as UserData } from 'common/decorators';
import { User } from 'common/entities/postgres';
import { AuthGuard } from 'services/auth/auth.guard';
import { SelfService } from './self.service';

@Controller('self')
export class SelfController {
  constructor(private selfService: SelfService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  myDetails(@UserData() user: User) {
    return this.selfService.myDetails(user.username);
  }
}
