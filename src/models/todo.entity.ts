import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("todos")
export class Todo {
	@PrimaryGeneratedColumn()
	public id: number;

	@CreateDateColumn({ name: "created_at", nullable: false })
	public createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", nullable: false })
	public updatedAt: Date;

	@Column({ nullable: false, length: 255, type: "varchar" })
	public title: string;

	@Column({ nullable: true, length: 1000, type: "text" })
	public description?: string;

	@Column({ name: "is_completed", default: false, type: "boolean" })
	public isCompleted: boolean;

	@ManyToOne(() => User, user => user.todos)
	public user: User

	constructor(title: string, description: string) {
		this.title = title;
		this.description = description;
	}
}
