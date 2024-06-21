import { TravelFromApi } from '~/types/api/travels/types';

export default defineEventHandler(async event => {
	const body = await readBody(event);

	const runtimeConfig = useRuntimeConfig();

	try {
		const response: TravelFromApi = await $fetch(
			runtimeConfig.public.apiTravels,
			{
				method: 'POST',
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
