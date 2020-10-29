import { Length } from 'class-validator';

export class LoginDTO {
  @Length(1, 50)
  username: string;

  @Length(6, 50)
  password: string;
}
