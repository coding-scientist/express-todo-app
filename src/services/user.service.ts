import { db } from "../data-source";
import { PatchUserDTO, PostUserDTO, PutUserDTO } from "../dto/user.dto";
import { User } from "../models/user.entity";

export class UserService {
	private userRepo = db.getRepository(User);

	public async findAllUsers(): Promise<User[]> {
		try {
			return this.userRepo.find();
		} catch (e) {
			throw new Error("Failed to fetch users");
		}
	}

	public async findUserByID(id: number): Promise<User> {
		try {
			return this.userRepo.findOneByOrFail({ id });
		} catch (e) {
			throw new Error();
		}
	}

	public async createUser(userDTO: PostUserDTO): Promise<User> {
		const user = new User(
			userDTO.firstName,
			userDTO.lastName,
			userDTO.email,
			userDTO.password
		);
		try {
			return this.userRepo.save(user);
		} catch (e) {
			throw new Error();
		}
	}

	public async putUser(userDTO: PutUserDTO, id: number): Promise<User> {
		const user = new User(
			userDTO.firstName,
			userDTO.lastName,
			userDTO.email,
			userDTO.password
		);

		console.log(user)

		try {
			return this.userRepo.save({...userDTO, id});
		} catch (e) {
			throw new Error();
		}
	}

  public async patchUser(userDTO: PatchUserDTO, id: number): Promise<User> {
    try {
      const user = await this.userRepo.update({ id }, userDTO);
      if (user === null || user === undefined) throw new Error()
      const updatedUser = this.findUserByID(id);
      return updatedUser;
    }
    catch (e) {
      throw new Error();
    }
  }

	public async removeUser(id: number): Promise<void> {
		try {
			this.userRepo.delete({ id });
		} catch (e) {
			throw new Error();
		}
	}
}
