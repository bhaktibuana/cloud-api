import path from 'path';
import { promises as fsPromises } from 'fs';

import { I_UploaderSingle } from '@/shared/interfaces';

export class Uploader {
	private static readonly basePath: string = process.cwd();

	/**
	 * Init Temp dir
	 */
	public static async init() {
		const targetDir = path.join(Uploader.basePath, `public/tmp`);
		await fsPromises.mkdir(targetDir, { recursive: true });
	}

	/**
	 * Upload Single File
	 *
	 * @param file
	 * @param dirName
	 * @returns
	 */
	public static async single(
		file: Express.Multer.File,
		dirName: string,
	): Promise<I_UploaderSingle> {
		const fileName = `${file.filename}-${file.originalname}`;
		const targetDir = path.join(Uploader.basePath, `public/${dirName}`);
		const targetPath = path.join(targetDir, fileName);

		// Ensure the target directory exists (create it if it doesn't)
		await fsPromises.mkdir(targetDir, { recursive: true });

		// Move the uploaded file from temp location to the target location
		await fsPromises.rename(file.path, targetPath);

		return {
			file_name: fileName,
			path: `/${dirName}/${fileName}`,
			raw_path: targetPath,
		};
	}
}
