import { ObjectId } from 'bson';

import { Helper } from '@/shared/helpers';
import { Service } from '@/shared/libs/service.lib';
import {
	UserLoginRequestBody,
	UserRegisterRequestBody,
} from '@/transport/requests/user.request';
import { UserRepository } from '@/app/repositories';
import { S_User } from '@/app/models';

export class UserService extends Service {
	private userRepo: UserRepository;
	constructor() {
		super();

		this.userRepo = new UserRepository();
	}

	/**
	 * User Register Service
	 *
	 * @param reqBody
	 * @returns
	 */
	public async register(
		reqBody: UserRegisterRequestBody,
	): Promise<S_User | null> {
		try {
			const payload = {
				email: reqBody.email.toLowerCase(),
				password: Helper.hash(reqBody.password),
			};

			const user = await this.userRepo.findOneByEmail(payload.email);
			if (user)
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'Email already exist',
				);

			return await this.userRepo.create(payload.email, payload.password);
		} catch (error) {
			await this.catchErrorHandler(error, this.register.name);
		}
		return null;
	}

	/**
	 * User Login Service
	 *
	 * @param reqBody
	 * @returns
	 */
	public async login(reqBody: UserLoginRequestBody) {
		try {
			const payload = {
				email: reqBody.email.toLowerCase(),
				password: Helper.hash(reqBody.password),
			};

			const user = await this.userRepo.findLogin(
				payload.email,
				payload.password,
			);

			if (!user)
				this.errorHandler(
					this.STATUS_CODE.NOT_FOUND,
					'Wrong email or password',
				);

			const token = Helper.generateJWT(user?.toObject(), '7d');

			return { user, token };
		} catch (error) {
			await this.catchErrorHandler(error, this.login.name);
		}
		return null;
	}

	/**
	 * User Me Service
	 *
	 * @param id
	 * @returns
	 */
	public async me(id: string): Promise<S_User | null> {
		try {
			const user = await this.userRepo.findById(new ObjectId(id));

			if (!user)
				this.errorHandler(this.STATUS_CODE.NOT_FOUND, 'User not found');

			return user;
		} catch (error) {
			await this.catchErrorHandler(error, this.me.name);
		}
		return null;
	}
}
