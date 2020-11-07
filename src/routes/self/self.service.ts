import { Injectable } from '@nestjs/common';
import { ResetPasswordDTO } from 'common/dtos';
import { User } from 'common/entities/postgres';
import { AuthService } from 'services/auth/auth.service';

@Injectable()
export class SelfService {
  constructor(private authService: AuthService) {}

  myDetails(username: string) {
    return User.findOne({ username });
  }

  async resetPassword(username: string, body: ResetPasswordDTO) {
    const user = await this.authService.validateUser({ username, password: body.currentPassword });
    this.authService.resetPassword(user.username, body.newPassword);
    return null;
  }
}
