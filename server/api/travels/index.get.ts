import { TravelFromApi } from '~/types/api/travels/types';

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig();

	try {
		const travelsData: TravelFromApi = await $fetch(
			runtimeConfig.public.apiTravels
		);

		return {
			status: 'ok',
			data: travelsData,
		};
	} catch (e) {
		return {
			status: 'ko',
			data: undefined,
		};
	}
});
