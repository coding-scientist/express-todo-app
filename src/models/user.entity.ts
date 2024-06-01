import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Todo } from "./todo.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@CreateDateColumn({ name: "created_at" })
	public createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	public updatedAt: Date;

	@Column({ name: "first_name", type: "varchar", nullable: false })
	public firstName: string;

	@Column({ name: "last_name", type: "varchar", nullable: false })
	public lastName: string;

	@Column({ type: "varchar", unique: true })
	public email: string;

	@Column({ type: "varchar" })
	public password: string;

	@OneToMany(() => Todo, todo => todo.user)
	public todos: Todo[];

	constructor(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
}
