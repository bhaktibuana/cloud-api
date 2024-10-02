import dayjs from 'dayjs';
import { Schema, Model as MongoModel, Document, Types } from 'mongoose';

import { Model } from '@/shared/libs/model.lib';
import { Mongo } from '@/shared/utils';

export interface S_Repository extends S_RepositoryBase, Document {}

export interface S_RepositoryBase {
	user_id?: string;
	name?: string;
	token?: string;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}

class RepositorySchema {
	public static getSchema() {
		return new Schema<S_RepositoryBase>({
			user_id: {
				type: Types.ObjectId,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			token: {
				type: String,
				required: true,
			},
			created_at: {
				type: Date,
				required: true,
				default: dayjs().toDate(),
			},
			updated_at: {
				type: Date,
				required: true,
				default: dayjs().toDate(),
			},
			deleted_at: {
				type: Date,
				default: null,
			},
		});
	}
}

export class Repository extends Model<S_Repository> {
	public payload: S_RepositoryBase = {} as S_RepositoryBase;

	constructor() {
		super(
			Mongo.getMainDbConnection().models.repositories ||
				(Mongo.getMainDbConnection().model<S_Repository>(
					'repositories',
					RepositorySchema.getSchema(),
				) as MongoModel<S_Repository>),
		);
	}

	public async save(): Promise<S_Repository> {
		return await this.saveInstance(this.payload);
	}
}
