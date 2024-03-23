import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  @IsNotEmpty({ message: "User is required." })
  @IsUUID("4", { message: "User must be a valid uuid." })
  userId: string;

  @Column()
  @IsNotEmpty()
  code: string;

  @Column({ type: "enum", enum: ["reset-password", "verify-email"] })
  @IsNotEmpty()
  @IsEnum(["reset-password", "verify-email"])
  type: string;

  @Column({ type: "timestamp" })
  @IsNotEmpty()
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
