import { db } from "../data-source";
import { PatchTodoDTO, PostTodoDTO, PutTodoDTO } from "../dto/todo.dto";
import { Todo } from "../models/todo.entity";

export class TodoService {
	private todoRepo = db.getRepository(Todo);

	public async findAllTodos(): Promise<Todo[]> {
		try {
			return this.todoRepo.find();
		} catch (e) {
			throw new Error("Failed to fetch users");
		}
	}

	public async findTodoByID(id: number): Promise<Todo> {
		try {
			return this.todoRepo.findOneByOrFail({ id: id });
		}
		catch (e) {
			throw new Error()
		}
	}

	public async createTodo(todoDto: PostTodoDTO): Promise<Todo> {
		const todo = new Todo(todoDto.title, todoDto.description ?? "")
		try {
			return this.todoRepo.save(todo);
		}
		catch (e) {
			throw new Error()
		}
	}

	public async patchTodo(todoDto: PatchTodoDTO, id: number): Promise<Todo> {
		const todo = await this.todoRepo.update({id}, todoDto);
		if (todo === null || todo === undefined) throw new Error();
		const updatedTodo = this.findTodoByID(id);
		return updatedTodo;
	}

	public async putTodo(todoDto: PutTodoDTO, id: number): Promise<Todo> {
		const todo = new Todo(todoDto.title, todoDto.description)

		try {
			return this.todoRepo.save({...todo, id});
		}
		catch (e) {
			throw new Error()
		}
	}

	public async removeTodo(id: number): Promise<void> {
		try {
			this.todoRepo.delete({ id });
		} 
		catch (e) {
			throw new Error()
		}
	}
}
