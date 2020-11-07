import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO } from 'common/dtos';
import { User } from 'common/entities/postgres';
import { InsertResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createUser(user: RegisterDTO): Promise<InsertResult> {
    user.password = await this.hashPassword(user);
    return User.insert(user);
  }

  async hashPassword(user: RegisterDTO): Promise<string> {
    return await bcrypt.hash(user.password, 10);
  }

  async login(user: LoginDTO): Promise<string> {
    const { username } = await this.validateUser(user);
    return this.generateToken(username);
  }

  async validateUser(user: LoginDTO) {
    let kullanici = await User.findOne({ username: user.username }, { select: ['username', 'password'] });

    if (!kullanici) {
      kullanici = await User.findOne({ email: user.username }, { select: ['username', 'password', 'email'] });
    }

    if (!kullanici) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    const validPassword = await bcrypt.compare(user.password, kullanici.password);

    if (!validPassword) {
      throw new UnauthorizedException('Kullanıcı adı veya parola hatalı');
    }

    return kullanici;
  }

  generateToken(username: string): string {
    return this.jwtService.sign({ username });
  }

  decryptToken(token: string): User {
    return this.jwtService.verify(token);
  }

  async resetPassword(username, newPassword) {
    return await User.update({ username }, { password: await bcrypt.hash(newPassword, 10) });
  }
}
