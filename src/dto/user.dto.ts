export interface PostUserDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface PutUserDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface PatchUserDTO {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}
