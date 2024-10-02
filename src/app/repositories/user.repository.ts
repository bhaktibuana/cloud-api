import { Repository } from '@/shared/libs/repository.lib';
import { S_User, User } from '@/app/models';

export class UserRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Find One by Email
	 *
	 * @param email
	 * @returns
	 */
	public async findOneByEmail(email: string): Promise<S_User | null> {
		let result: S_User | null = null;
		const user = new User();

		try {
			result = await user.findOne({ email }, { email: 1 });
		} catch (error) {
			await this.catchErrorHandler(error, this.findOneByEmail.name);
		}
		return result;
	}

	/**
	 * Create User
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	public async create(
		email: string,
		password: string,
	): Promise<S_User | null> {
		let result: S_User | null = null;
		const user = new User();
		user.payload = {
			email,
			password,
		};

		try {
			result = await user.save();
		} catch (error) {
			await this.catchErrorHandler(error, this.create.name);
		}
		return result;
	}
}
