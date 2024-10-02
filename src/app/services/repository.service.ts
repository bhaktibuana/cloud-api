import { Service } from '@/shared/libs/service.lib';
import { RepositoryRepository } from '@/app/repositories';
import { S_Repository } from '@/app/models';
import { RepositoryCreateRequestBody } from '@/transport/requests/repository.request';
import { Helper } from '@/shared/helpers';

export class RepositoryService extends Service {
	private repositoryRepo: RepositoryRepository;
	constructor() {
		super();

		this.repositoryRepo = new RepositoryRepository();
	}

	/**
	 * Repository Create Service
	 *
	 * @param reqBody
	 * @param userId
	 * @returns
	 */
	public async create(
		reqBody: RepositoryCreateRequestBody,
		userId: string,
	): Promise<S_Repository | null> {
		try {
			const payload = {
				name: reqBody.name,
			};

			const repository = await this.repositoryRepo.findOneByName(
				payload.name,
			);
			if (repository)
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Name already exist',
				);

			const tokenPayload = {
				user_id: userId,
				name: payload.name,
			};
			const token = Helper.generateJWT(tokenPayload);

			return await this.repositoryRepo.create(
				userId,
				payload.name,
				token,
			);
		} catch (error) {
			await this.catchErrorHandler(error, this.create.name);
		}
		return null;
	}

	/**
	 * Repository List Service
	 *
	 * @param userId
	 * @returns
	 */
	public async list(userId: string): Promise<S_Repository[]> {
		try {
			return await this.repositoryRepo.getList(userId);
		} catch (error) {
			await this.catchErrorHandler(error, this.list.name);
		}
		return [];
	}
}
