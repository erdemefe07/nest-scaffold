import { Injectable } from '@nestjs/common';
import { AuthService } from 'services/auth/auth.service';
import { LoginDTO } from 'common/dtos';

@Injectable()
export class AppService {
  constructor(private authService: AuthService) { }

  async login(user: LoginDTO): Promise<{ access_token }> {
    const token = await this.authService.login(user);
    return { access_token: token };
  }

  async register(user: LoginDTO): Promise<null> {
    await this.authService.createUser(user);
    return null;
  }
}
