import { HealthIndicatorStatus } from '@nestjs/terminus';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  UP = 'up',
  DOWN = 'down',
}

@Entity({ name: 'service_monitoring' })
@Unique(['name'])
export class MonitoringEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 4, default: 'up' })
  status: HealthIndicatorStatus;

  @Column({ type: 'varchar', length: 100, select: false })
  url: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;
}
