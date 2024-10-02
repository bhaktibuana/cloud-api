import { Router as ExpressRouter } from 'express';

import { Router } from '@/shared/libs/router.lib';
import { UploaderController } from '@/app/controllers';

export class UploaderRouter extends Router<UploaderController> {
	constructor(router: ExpressRouter) {
		super(router, '/uploader', new UploaderController());

		this.post('/', this.controller.upload, ['uploadSingle']);
	}
}
