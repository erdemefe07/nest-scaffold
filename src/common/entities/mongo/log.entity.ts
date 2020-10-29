import { LogDTO } from 'services/log/dtos/Log.dto';
import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  type: string;

  @Column()
  detail: string;

  @Column()
  exception: any;

  @Column()
  req: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  constructor(log: LogDTO) {
    /**
     * Try yapmazsan javascript'e dönüştürünce hata veriyor
     * Typeorm constructoru olduğu gibi alıyor ama
     * Field'ların isimlerini dönüştürüyor
     * Bu yüzden this.username'yi bulamıyor
     */
    try {
      this.type = log.type;
      this.detail = log.detail;
      this.exception = log.exception;
      this.req = log.req;
    } catch (error) {}
  }
}
