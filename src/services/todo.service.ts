import { db } from "../data-source";
import { Todo } from "../models/todo.entity";

export class TodoService {
	private todoRepo = db.getRepository(Todo);

	public async findAllTodos() {
		let todos = await this.todoRepo.find();

		if (todos.length <= 0) {
			throw new Error("Unable to fetch todos");
		}

		return todos;
	}

	public async findTodoByID(id: number) {
		let todo = await this.todoRepo.findOneBy({ id: id });
		if (todo === null) throw new Error("Todo not found");
		return todo;
	}
}
