import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

@Entity()
export class TokenEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  hash: string;

  @Column({ length: 100 })
  usuario: string;

}