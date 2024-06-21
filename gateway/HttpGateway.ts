class Gateway {
	getUseFetch = async <R>(path: string) => {
		const { data: data } = await useFetch<ApiResponse<R>>(path);
		return data;
	};
	get = async <R>(path: string): Promise<ApiResponse<R>> => {
		const dto: ApiResponse<R> = await $fetch(path);
		return dto;
	};
	post = async <B, R>(path: string, body: B): Promise<ApiResponse<R>> => {
		const dto: ApiResponse<R> = await $fetch(path, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return dto;
	};
	delete = async <R>(path: string, id: string): Promise<ApiResponse<R>> => {
		const dto: ApiResponse<R> = await $fetch(path + '/' + id, {
			method: 'DELETE',
		});

		return dto;
	};
	update = async <B, R>(
		path: string,
		id: string,
		body: B
	): Promise<ApiResponse<R>> => {
		const dto: ApiResponse<R> = await $fetch(path + '/' + id, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return dto;
	};
}

const gateway = new Gateway();
export default gateway;
