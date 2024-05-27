import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

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
  
  @Column({nullable: false, length: 1000, type: "text"})
  public description: string;

  @Column({name: "is_completed", default: false, type: "bool"})
  public isCompleted: boolean;

  constructor(title: string, description: string) {
    this.title = title
    this.description = description
  }
}
