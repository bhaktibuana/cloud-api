import { Router as ExpressRouter } from 'express';

import { Router } from '@/shared/libs/router.lib';
import { RepositoryController } from '@/app/controllers';

export class RepositoryRouter extends Router<RepositoryController> {
	constructor(router: ExpressRouter) {
		super(router, '/repository', new RepositoryController());

		this.post('/create', this.controller.create, ['auth']);
		this.get('/', this.controller.list, ['auth']);
	}
}
