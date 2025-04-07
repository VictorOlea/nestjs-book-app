import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  purchaseDate: Date;

  @Column({ default: false })
  isRead: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
