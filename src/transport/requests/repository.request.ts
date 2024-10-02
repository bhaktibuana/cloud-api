import { IsString, IsNotEmpty } from 'class-validator';

export class RepositoryCreateRequestBody {
	@IsString()
	@IsNotEmpty()
	name!: string;
}
