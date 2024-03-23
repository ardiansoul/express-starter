import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsUUID } from "class-validator";

/*
TODO:
    - Create UserSession (check)
    - Add UserSession to User (uncheck)
    - Validate UserSession (uncheck)


*/
@Entity()
export class UserSession {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  @IsNotEmpty({ message: "User is required" })
  @IsUUID("4", { message: "User must be a valid UUID" })
  userId: string;

  @Column({ type: "jsonb", default: {} })
  deviceInfo: Record<string, any>;

  @Column({ type: "timestamp" })
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
