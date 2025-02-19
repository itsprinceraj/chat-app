import { DataSource } from "typeorm";
import { User } from "../../user/user.schema";
import { Message } from "../../chats/chat.schema";
import { Group } from "../../group-chat/group.schema";
import dotenv from "dotenv";
dotenv.config();

const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

//  create a function to initialize the database connection;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: PASSWORD, // use 1234 in mac;
  database: DATABASE,
  port: 5432, // use 3000 in maec;
  synchronize: true,
  entities: [User, Message, Group],
  // migrations: ["app/migrations/*.ts"],
});

export const initDb = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("DB Connected ");
    })
    .catch((err) => {
      console.log("DB Connection failed: ", err);
    });
};
