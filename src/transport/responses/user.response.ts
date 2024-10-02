import { S_User } from '@/app/models';

export class UserResponse {
	/**
	 * User Register Response
	 *
	 * @param payload
	 * @returns
	 */
	public register(payload: S_User | null) {
		if (!payload) return null;
		return {
			_id: payload.id,
			email: payload.email,
		};
	}

	/**
	 * User Login Response
	 *
	 * @param payload
	 * @returns
	 */
	public login(payload: { user: S_User | null; token: string } | null) {
		if (!payload || !payload.user) return null;
		return {
			_id: payload.user.id,
			email: payload.user.email,
			token: payload.token,
		};
	}
}
