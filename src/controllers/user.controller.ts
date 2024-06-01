import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import {
	DEFAULT_BAD_REQUEST_MESSAGE,
	DEFAULT_FAILED_CREATION_MESSAGE,
	DEFAULT_FAILED_DELETE_MESSAGE,
	DEFAULT_FAILED_UPDATE_MESSAGE,
	HttpStatusCodes,
} from "../utils/constants";
import { ErrorResponse } from "../utils/errors";
import {
	validateUserPatch,
	validateUserPost,
	validateUserPut,
} from "../validation/user.validation";

class UserController {
	private userService = new UserService();

	public async getAllUsers(
		request: Request,
		response: Response
	): Promise<void> {
		try {
			const users = await this.userService.findAllUsers();
			response.status(HttpStatusCodes.OK).json(users);
		} catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Failed to fetch users"
					)
				);
		}
	}

	public async getUserByID(
		request: Request,
		response: Response
	): Promise<void> {
		const id = parseInt(request.params?.id);

		if (id === null || id === undefined || id === 0) {
			response
				.status(HttpStatusCodes.BAD_REQUEST)
				.json(
					new ErrorResponse(HttpStatusCodes.BAD_REQUEST, "Invalid user id")
				);
			return;
		}

		try {
			const user = await this.userService.findUserByID(id);
			response.status(HttpStatusCodes.OK).json(user);
		} catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Could not find user"
					)
				);
		}
	}

	public async postUser(request: Request, response: Response): Promise<void> {
		const { body } = request;
		if (!validateUserPost(body)) {
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
			const user = await this.userService.createUser(body);
			response.status(HttpStatusCodes.CREATED).json(user);
		} catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						DEFAULT_FAILED_CREATION_MESSAGE
					)
				);
		}
	}

	public async putUser(request: Request, response: Response): Promise<void> {
		const id = parseInt(request.params?.id)
		const { body } = request;

		if (!validateUserPut(body)) {
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
			const user = await this.userService.putUser(body, id);
			response.status(HttpStatusCodes.OK).json(user);
		} catch (e) {
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

	public async patchUser(request: Request, response: Response): Promise<void> {
		const id = parseInt(request.params?.id);
		const { body } = request;

		if (!validateUserPatch(body)) {
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
			const user = await this.userService.patchUser(body, id);
			response.status(HttpStatusCodes.OK).json(user);
		} catch (e) {
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

	public async deleteUser(request: Request, response: Response): Promise<void> {
		const id = parseInt(request.params?.id);

		try {
			this.userService.removeUser(id);
			response.sendStatus(HttpStatusCodes.OK);
		} catch (e) {
			response
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json(
					new ErrorResponse(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						DEFAULT_FAILED_DELETE_MESSAGE
					)
				);
			return;
		}
	}
}

const userController = new UserController();
export const userRouter = Router();

userRouter.get("/users", (request: Request, response: Response) =>
	userController.getAllUsers(request, response)
);
userRouter.get("/users/:id", (request: Request, response: Response) =>
	userController.getUserByID(request, response)
);
userRouter.post("/users", (request: Request, response: Response) =>
	userController.postUser(request, response)
);
userRouter.put("/users/:id", (request: Request, response: Response) =>
	userController.putUser(request, response)
);
userRouter.patch("/users/:id", (request: Request, response: Response) =>
	userController.patchUser(request, response)
);
userRouter.delete("/users/:id", (request: Request, response: Response) =>
	userController.deleteUser(request, response)
);
