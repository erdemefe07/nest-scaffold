import { Length } from 'class-validator';
import { Confirm } from 'common/decorators/Confirm.decorator';

export class ResetPasswordDTO {
  @Length(6, 60)
  currentPassword: string;

  @Length(6, 60)
  @Confirm('currentPassword', {message: 'Current password cannot be the same as the new password'})
  newPassword: string;
}
