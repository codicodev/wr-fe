import { TravelFromApi } from '~/types/api/travels/types';

export default defineEventHandler(async event => {
	const id = getRouterParam(event, 'id');
	const runtimeConfig = useRuntimeConfig();

	try {
		const response: TravelFromApi = await $fetch(
			`${runtimeConfig.public.apiTravels}/${id}`,
			{
				method: 'DELETE',
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
