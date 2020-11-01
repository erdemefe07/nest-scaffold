import { IsEmail } from 'class-validator';
import { LoginDTO } from 'common/dtos';
import { BaseEntity, Check, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column({ select: false, length: 50 })
  @Check('check-minlen', 'length(password) >= 6')
  password: string;

  // @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  constructor(user?: LoginDTO) {
    super();

    /**
     * Try yapmazsan javascript'e dönüştürünce hata veriyor
     * Typeorm constructoru olduğu gibi alıyor ama
     * Field'ların isimlerini dönüştürüyor
     * Bu yüzden this.username'yi bulamıyor
     */
    try {
      this.username = user.username;
      this.password = user.password;
    } catch (error) {}
  }
}
