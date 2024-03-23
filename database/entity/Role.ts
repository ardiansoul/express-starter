import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { IsNotEmpty, MinLength } from "class-validator";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @Column()
  @MinLength(8, { message: "Description must be at least 8 characters long" })
  @IsNotEmpty({ message: "Description is required" })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
