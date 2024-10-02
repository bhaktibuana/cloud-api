export class UploaderResponse {
	/**
	 * Uploader Upload Response
	 *
	 * @param url
	 * @returns
	 */
	public upload(url: string | null) {
		if (!url) return null;
		return {
			url,
		};
	}
}
