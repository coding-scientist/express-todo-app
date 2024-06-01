import { PatchTodoDTO, PostTodoDTO, PutTodoDTO } from "./../dto/todo.dto";
import { isObject } from "./helpers";

export function validateTodoPost(obj: any): obj is PostTodoDTO {
	return (
		isObject(obj) &&
		typeof obj.title === "string" &&
		(obj?.description !== undefined
			? typeof obj?.description === "string"
			: true)
	);
}

export function validateTodoPut(obj: any): obj is PutTodoDTO {
	return (
		isObject(obj) &&
		typeof obj.title === "string" &&
		typeof obj.isCompleted === "boolean" &&
		(obj?.description !== undefined
			? typeof obj?.description === "string"
			: true)
	);
}

export function validateTodoPatch(obj: any): obj is PatchTodoDTO {
	return (
		isObject(obj) &&
		typeof (obj?.title !== undefined ? typeof obj?.title === "string" : true) &&
		typeof (obj?.isCompleted !== undefined
			? typeof obj?.isCompleted === "boolean"
			: true) &&
		(obj?.description !== undefined
			? typeof obj?.description === "string"
			: true)
	);
}
