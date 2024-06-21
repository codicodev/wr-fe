import { BookingApi } from '~/types/api/bookings/types';

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig();

	try {
		const bookingsData: BookingApi = await $fetch(
			runtimeConfig.public.apiBookings
		);

		return {
			status: 'ok',
			data: bookingsData,
		};
	} catch (e) {
		return {
			status: 'ko',
			data: undefined,
		};
	}
});
