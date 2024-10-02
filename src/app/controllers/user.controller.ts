import { Request, Response } from 'express';

import { Controller } from '@/shared/libs/controller.lib';
import { UserRegisterRequestBody } from '@/transport/requests/user.request';
import { UserService } from '@/app/services';
import { UserResponse } from '@/transport/responses/user.response';

export class UserController extends Controller {
	private userSvc: UserService;
	private userRes: UserResponse;

	constructor() {
		super();

		this.userSvc = new UserService();
		this.userRes = new UserResponse();
	}

	/**
	 * User Register Controller
	 *
	 * @param req
	 * @param res
	 */
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				UserRegisterRequestBody,
				req,
			);

			const result = await this.userSvc.register(reqBody);

			this.response(
				res,
				'Register success',
				this.STATUS_CODE.CREATED,
				this.userRes.register(result),
			);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.register.name);
		}
	}
}
