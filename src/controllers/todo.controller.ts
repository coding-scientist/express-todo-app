import { Request, Response, Router } from "express";
import { TodoService } from "../services/todo.service";
import {
	DEFAULT_BAD_REQUEST_MESSAGE,
	DEFAULT_FAILED_UPDATE_MESSAGE,
	HttpStatusCodes,
} from "../utils/constants";
import { ErrorResponse } from "../utils/errors";
import {
	validateTodoPatch,
	validateTodoPost,
	validateTodoPut,
} from "../validation/todo.validation";

class TodoController {
	public todoService = new TodoService();

	public async getAllTodos(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const todos = await this.todoService.findAllTodos();
			response.status(HttpStatusCodes.OK).json(todos);
		} catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.send(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Something went wrong"
					)
				);
		}
	}

	public async getTodoByID(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const id = parseInt(request.params?.id);
			const todo = await this.todoService.findTodoByID(id);
			response.status(HttpStatusCodes.OK).json(todo);
		} catch (e) {
			response
				.status(HttpStatusCodes.NOT_FOUND)
				.json(
					new ErrorResponse(
						HttpStatusCodes.NOT_FOUND,
						"Could not find the specified todo"
					)
				);
		}
	}

	public async postTodo(request: Request, response: Response): Promise<void> {
		const { body } = request;
		if (!validateTodoPost(body)) {
			response
				.status(HttpStatusCodes.BAD_REQUEST)
				.json(
					new ErrorResponse(
						HttpStatusCodes.BAD_REQUEST,
						DEFAULT_BAD_REQUEST_MESSAGE
					)
				);
			return;
		}

		const todo = await this.todoService.createTodo(body);

		if (todo === null || todo === undefined || Object.keys(todo).length === 0) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Failed to create todo"
					)
				);
			return;
		}

		response.status(HttpStatusCodes.CREATED).send(todo);
	}

	public async putTodo(request: Request, response: Response): Promise<void> {
		const id = parseInt(request.params?.id);
		const { body } = request;

		if (!validateTodoPut(body)) {
			response
				.status(HttpStatusCodes.BAD_REQUEST)
				.json(
					new ErrorResponse(
						HttpStatusCodes.BAD_REQUEST,
						DEFAULT_BAD_REQUEST_MESSAGE
					)
				);
			return;
		}
		try {
			const todo = await this.todoService.putTodo(body, id);
			response.status(HttpStatusCodes.OK).json(todo);
		}
		catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						DEFAULT_FAILED_UPDATE_MESSAGE
					)
				);
		}
	}

	public async patchTodo(request: Request, response: Response): Promise<void> {
		const id = parseInt(request.params?.id);
		const { body } = request;

		if (!validateTodoPatch(body)) {
			response
				.status(HttpStatusCodes.BAD_REQUEST)
				.json(
					new ErrorResponse(
						HttpStatusCodes.BAD_REQUEST,
						DEFAULT_BAD_REQUEST_MESSAGE
					)
				);
			return;
		}
		const todo = await this.todoService.patchTodo(body, id);

		if (todo === null || todo === undefined || Object.keys(todo).length === 0) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Failed to update todo"
					)
				);
			return;
		}

		response.status(HttpStatusCodes.OK).send(todo);
	}

	public async deleteTodo(request: Request, response: Response): Promise<void> {
		const id = parseInt(request.params?.id);

		try {
			this.todoService.removeTodo(id);
		} catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Failed to delete todo"
					)
				);
			return;
		}

		response.sendStatus(HttpStatusCodes.OK);
	}
}

export const todoRouter = Router();
const todoController = new TodoController();

todoRouter.get("/todos", (request: Request, response: Response) =>
	todoController.getAllTodos(request, response)
);
todoRouter.get("/todos/:id", (request: Request, response: Response) =>
	todoController.getTodoByID(request, response)
);
todoRouter.post("/todos", (request: Request, response: Response) =>
	todoController.postTodo(request, response)
);
todoRouter.put("/todos/:id", (request: Request, response: Response) =>
	todoController.putTodo(request, response)
);
todoRouter.patch("/todos/:id", (request: Request, response: Response) =>
	todoController.patchTodo(request, response)
);
todoRouter.delete("/todos/:id", (request: Request, response: Response) =>
	todoController.deleteTodo(request, response)
);
