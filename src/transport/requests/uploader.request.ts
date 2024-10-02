import { IsString, IsNotEmpty } from 'class-validator';

export class UploaderUploadRequestBody {
	@IsString()
	@IsNotEmpty()
	token!: string;
}
