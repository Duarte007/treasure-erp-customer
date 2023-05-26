import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_customer_uuid')
  customer_uuid: string;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_address_uuid')
  address_uuid: string;

  @Column({ length: 255 })
  customer_name: string;

  @Column({ length: 255, unique: true })
  customer_document: string;

  @Column({ length: 255, unique: true })
  customer_email: string;

  @Column({ length: 255, unique: true })
  customer_phone: string;
}

export interface CustomerRecord {
  customer_name: string;
  customer_uuid: string;
  customer_document: string;
  customer_email: string;
  customer_phone: string;
  address_uuid: string;
}
