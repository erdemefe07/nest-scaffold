import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 320 })
  @IsEmail()
  email: string;

  @Column({ length: 50 })
  username: string;

  @Column({ type: 'char', select: false, length: 60 })
  @Check('check-minlen', 'length(password) >= 6')
  password: string;

  // @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
