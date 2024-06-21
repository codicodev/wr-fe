export default defineEventHandler(async event => {
	const id = getRouterParam(event, 'id');

	const runtimeConfig = useRuntimeConfig();

	const body = await readBody(event);

	try {
		const response = await $fetch(
			`${runtimeConfig.public.apiTravels}/${id}`,
			{
				method: 'PUT',
				body: body,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		return {
			status: 'ok',
			data: response,
		};
	} catch (e) {
		return {
			status: 'ko',
		};
	}
});
