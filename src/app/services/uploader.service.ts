import { Helper } from '@/shared/helpers';
import { Service } from '@/shared/libs/service.lib';
import { Uploader } from '@/shared/utils/uploader.util';
import { UploaderUploadRequestBody } from '@/transport/requests/uploader.request';
import { RepositoryRepository } from '@/app/repositories';

export class UploaderService extends Service {
	private repositoryRepo: RepositoryRepository;

	constructor() {
		super();

		this.repositoryRepo = new RepositoryRepository();
	}

	/**
	 * Uploader Upload Single Service
	 *
	 * @param reqBody
	 * @param file
	 * @returns
	 */
	public async upload(
		reqBody: UploaderUploadRequestBody,
		file: Express.Multer.File | undefined,
	) {
		try {
			const payload = {
				token: reqBody.token,
				file,
			};

			const { error, decoded } = Helper.verifyJWT<{
				user_id: string;
				name: string;
			}>(payload.token);
			if (error)
				this.errorHandler(
					this.STATUS_CODE.UNAUTHORIZED,
					error.message,
					error,
				);

			const tokenPayload = decoded as { user_id: string; name: string };

			const repository = await this.repositoryRepo.checkRepo(
				tokenPayload.user_id,
				tokenPayload.name,
			);
			if (!repository) {
				this.errorHandler(
					this.STATUS_CODE.UNAUTHORIZED,
					'Invalid token',
					error,
				);
			}

			if (!payload.file) {
				this.errorHandler(
					this.STATUS_CODE.BAD_REQUEST,
					'File is required',
					error,
				);
			}

			const uplaod = await Uploader.single(
				payload.file as Express.Multer.File,
				repository?.name as string,
			);

			return uplaod.path;
		} catch (error) {
			await this.catchErrorHandler(error, this.upload.name);
		}
		return null;
	}
}
