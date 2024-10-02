import { Request, Response } from 'express';

import { Controller } from '@/shared/libs/controller.lib';
import { RepositoryService } from '@/app/services';
import { RepositoryCreateRequestBody } from '@/transport/requests/repository.request';
import { RepositoryResponse } from '@/transport/responses/repository.response';

export class RepositoryController extends Controller {
	private repositorySvc: RepositoryService;
	private repositoryRes: RepositoryResponse;

	constructor() {
		super();

		this.repositorySvc = new RepositoryService();
		this.repositoryRes = new RepositoryResponse();
	}

	/**
	 * Repository Create Controller
	 *
	 * @param req
	 * @param res
	 */
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				RepositoryCreateRequestBody,
				req,
			);
			const user = this.getLocals(res).user;

			const result = await this.repositorySvc.create(
				reqBody,
				user._id as string,
			);

			this.response(
				res,
				'Register success',
				this.STATUS_CODE.CREATED,
				this.repositoryRes.create(result),
			);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.create.name);
		}
	}
}
