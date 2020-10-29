import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'common/dtos';
import { User } from 'common/entities/postgres';
import { InsertResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(username: string): string {
    return this.jwtService.sign({ username });
  }

  decryptToken(token: string): User {
    return this.jwtService.verify(token);
  }

  createUser(user: LoginDTO): Promise<InsertResult> {
    return User.insert(user);
  }

  async validatePassword(user: LoginDTO): Promise<User> {
    const kullanici = await User.findOne({ username: user.username }, { select: ['username', 'password'] });
    if (kullanici.password != user.password) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre yanlış');
    }
    return kullanici;
  }

  async login(user: LoginDTO): Promise<string> {
    const { username } = await this.validatePassword(user);
    return this.generateToken(username);
  }
}
