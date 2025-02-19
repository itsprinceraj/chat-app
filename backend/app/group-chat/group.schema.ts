import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Message } from "../chats/chat.schema";
import { User } from "../user/user.schema";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  isPublic: boolean;

  @OneToMany(() => Message, (message) => message.group, {
    cascade: true,
    eager: true,
  })
  messages: Message[];


  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  members: User[];
}
