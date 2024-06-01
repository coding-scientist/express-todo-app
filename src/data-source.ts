import { DataSource } from "typeorm";
import { Todo } from "./models/todo.entity";
import { User } from "./models/user.entity";

export const db = new DataSource({
	type: "sqlite",
	//host: "localhost",
	//port: 5432,
	//username: "postgres",
	//password: "admin",
	database: "test",
	synchronize: true,
	logging: true,
	entities: [User, Todo],
	//migrations: []
});
