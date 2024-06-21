export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig();

	try {
		const travelsData = await $fetch(runtimeConfig.public.apiBookings);

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
