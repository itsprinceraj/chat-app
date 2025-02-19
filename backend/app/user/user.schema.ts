import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Message } from "../chats/chat.schema";
import { Group } from "../group-chat/group.schema";

// define entity
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Message, (message) => message.sender, {
    cascade: true,
    eager: true,
  })
  messages: Message[];

  @ManyToMany(() => Group, (group) => group.members, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  groups: Group[];
}
