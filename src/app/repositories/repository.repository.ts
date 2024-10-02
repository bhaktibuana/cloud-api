import { Repository as Repo, S_Repository } from '@/app/models';
import { Repository } from '@/shared/libs/repository.lib';

export class RepositoryRepository extends Repository {
	constructor() {
		super();
	}

	/**
	 * Find One by Name
	 *
	 * @param email
	 * @returns
	 */
	public async findOneByName(name: string): Promise<S_Repository | null> {
		let result: S_Repository | null = null;
		const repository = new Repo();

		try {
			result = await repository.findOne({ name }, { name: 1 });
		} catch (error) {
			await this.catchErrorHandler(error, this.findOneByName.name);
		}
		return result;
	}

	/**
	 * Create Repository
	 *
	 * @param userId
	 * @param name
	 * @returns
	 */
	public async create(
		userId: string,
		name: string,
		token: string,
	): Promise<S_Repository | null> {
		let result: S_Repository | null = null;
		const repository = new Repo();
		repository.payload = {
			user_id: userId,
			name,
			token,
		};

		try {
			result = await repository.save();
		} catch (error) {
			await this.catchErrorHandler(error, this.create.name);
		}
		return result;
	}

	/**
	 * Get Repository list
	 *
	 * @param userId
	 * @returns
	 */
	public async getList(userId: string): Promise<S_Repository[]> {
		let result: S_Repository[] = [];
		const repository = new Repo();

		try {
			result = await repository.find({ user_id: userId });
		} catch (error) {
			await this.catchErrorHandler(error, this.getList.name);
		}
		return result;
	}
}
