import { Router as ExpressRouter } from 'express';

import { Router } from '@/shared/libs/router.lib';
import { UserController } from '@/app/controllers';

export class UserRouter extends Router<UserController> {
	constructor(router: ExpressRouter) {
		super(router, '/user', new UserController());

		this.post('/register', this.controller.register);
	}
}
