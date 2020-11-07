import { IsEmail, Length } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @Length(1, 50)
  username: string;

  @Length(6, 60)
  password: string;
}
