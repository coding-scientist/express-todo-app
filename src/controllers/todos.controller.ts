import { Request, Response, Router } from "express";
import { TodoService } from "../services/todo.service";
import { StatusCodes } from "../utils/constants";
import { ErrorResponse } from "../utils/errors";

class TodoController {
	public todoService = new TodoService();

  public async getAllTodos(request: Request, response: Response) {
    try {
      const todos = await this.todoService.findAllTodos()
      response.status(StatusCodes.OK).json(todos)
    } catch (e) {
      console.error(e)
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong"))
    }
  }

  public async getTodoByID(request: Request, response: Response) {
    try {
      const id = parseInt(request.params?.id)
      const todo = await this.todoService.findTodoByID(id)
      response.status(StatusCodes.OK).json(todo)
    } catch (e) {
      response.status(StatusCodes.NOT_FOUND).json(new ErrorResponse(StatusCodes.NOT_FOUND, "Could not find the specified todo"))
    }
  }
}

export const todoRouter = Router();
const todoController = new TodoController()

todoRouter.get("/todos", (request: Request, response: Response) => todoController.getAllTodos(request, response));
todoRouter.get("/todos/:id", (request: Request, response: Response) => todoController.getTodoByID(request, response))