import { Router } from 'express';

import { BaseRouter } from '@/transport/routers/base.router';
import { UserRouter } from '@/transport/routers/user.router';
import { RepositoryRouter } from '@/transport/routers/repository.router';
import { UploaderRouter } from '@/transport/routers/uploader.router';

export class Routers extends BaseRouter {
	public readonly appRouter: Router;

	constructor() {
		super();

		this.appRouter = Router();
		this.appRoutes(this.appRouter);
		this.index(this.appRouter);
	}

	/**
	 * App Route lists
	 *
	 * @param router
	 */
	private appRoutes(router: Router): void {
		new UserRouter(router);
		new RepositoryRouter(router);
		new UploaderRouter(router);
	}
}
