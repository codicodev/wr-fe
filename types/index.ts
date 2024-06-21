export interface ApiResponse<T> {
	status: 'ok' | 'ko';
	data?: T;
}
