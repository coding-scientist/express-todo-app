import { DataSource } from "typeorm";

export const db = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "admin",
	database: "test",
});
