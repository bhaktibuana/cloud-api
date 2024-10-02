import { S_Repository } from '@/app/models';

export class RepositoryResponse {
	/**
	 * Repository Create Response
	 *
	 * @param payload
	 * @returns
	 */
	public create(payload: S_Repository | null) {
		if (!payload) return null;
		return {
			_id: payload.id,
			user_id: payload.user_id,
			name: payload.name,
			token: payload.token,
		};
	}

	/**
	 * Repository List Response
	 *
	 * @param payload
	 * @returns
	 */
	public list(payload: S_Repository[] | null) {
		if (payload === null) return null;
		if (payload.length === 0) return [] as S_Repository[];
		return payload;
	}
}
