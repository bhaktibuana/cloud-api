import { Request, Response } from 'express';

import { Controller } from '@/shared/libs/controller.lib';
import { UploaderService } from '@/app/services';
import { UploaderUploadRequestBody } from '@/transport/requests/uploader.request';
import { UploaderResponse } from '@/transport/responses/uploader.response';

export class UploaderController extends Controller {
	private uploaderSvc: UploaderService;
	private uploaderRes: UploaderResponse;

	constructor() {
		super();

		this.uploaderSvc = new UploaderService();
		this.uploaderRes = new UploaderResponse();
	}

	/**
	 * Uploader Upload Single Controller
	 *
	 * @param req
	 * @param res
	 */
	public async upload(req: Request, res: Response): Promise<void> {
		try {
			const reqBody = await this.getRequestBody(
				UploaderUploadRequestBody,
				req,
			);

			const baseUrl = this.getLocals(res).base_url;

			const result = await this.uploaderSvc.upload(reqBody, req.file);
			const uri = `${baseUrl}${result}`;

			this.response(
				res,
				'Upload success',
				this.STATUS_CODE.CREATED,
				this.uploaderRes.upload(uri),
			);
		} catch (error) {
			await this.catchErrorHandler(res, error, this.upload.name);
		}
	}
}
