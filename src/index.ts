import cors from "cors";
import "dotenv";
import express from "express";
import "reflect-metadata";
import { todoRouter } from "./controllers/todos.controller";
import { exit } from "process";
import { db } from "./data-source";

const app = express();
const PORT = process.env.PORT ?? 4100;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1", todoRouter);

async function main(): Promise<void> {
  try {
    await db.initialize()
    app.listen(PORT, async () => {
      const tables = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
      console.log(tables)
      console.log("Listening on http://localhost:" + PORT)
    });
  } catch (err) {
    console.error("Failed to initialize app\n\n", err);
		exit(1);
  }
}

main()