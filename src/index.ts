import cors from "cors";
import "dotenv";
import express from "express";
import "reflect-metadata";
import { todoRouter } from "./controllers/todo.controller";
import { exit } from "process";
import { db } from "./data-source";
import { userRouter } from "./controllers/user.controller";

const app = express();
const PORT = process.env.PORT ?? 4100;
const ROOT_API_ROUTE = "/api/v1/"

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(ROOT_API_ROUTE, todoRouter);
app.use(ROOT_API_ROUTE, userRouter)

// TODO: Implement authentication

async function main(): Promise<void> {
  try {
    await db.initialize()
    app.listen(PORT, () => console.log("\nListening on http://localhost:" + PORT));
  } catch (err) {
    console.error("Failed to initialize app\n\n");
		exit(1);
  }
}

main()