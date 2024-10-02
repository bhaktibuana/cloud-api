import dayjs from 'dayjs';
import { Schema, Model as MongoModel, Document } from 'mongoose';

import { Model } from '@/shared/libs/model.lib';
import { Mongo } from '@/shared/utils';

export interface S_User extends S_UserBase, Document {}

export interface S_UserBase {
	email?: string;
	password?: string;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}

class UserSchema {
	public static getSchema() {
		return new Schema<S_UserBase>({
			email: {
				type: String,
				required: true,
			},
			password: {
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

export class User extends Model<S_User> {
	public payload: S_UserBase = {} as S_UserBase;

	constructor() {
		super(
			Mongo.getMainDbConnection().models.user ||
				(Mongo.getMainDbConnection().model<S_User>(
					'user',
					UserSchema.getSchema(),
				) as MongoModel<S_User>),
		);
	}

	public async save(): Promise<S_User> {
		return await this.saveInstance(this.payload);
	}
}
