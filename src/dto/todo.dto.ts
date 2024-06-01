export interface PostTodoDTO {
  title: string,
  description?: string,
}

export interface PatchTodoDTO {
  title?: string,
  description?: string,
  completed?: boolean
}

export interface PutTodoDTO {
  id: number
	title: string;
	description: string;
	completed: boolean;
}