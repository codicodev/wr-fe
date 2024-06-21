// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@pinia/nuxt', '@nuxt/ui'],
	nitro: {
		externals: {
			inline: ['uuid'],
		},
	},
	imports: {
		dirs: ['types/*.ts', 'stores/*.ts', 'types/**/*.ts'],
	},

	routeRules: {
		'/': { redirect: '/travels' },
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	spaLoadingTemplate: false,
	runtimeConfig: {
		public: {
			apiTravels: 'http://localhost:8000/travels',
			apiBookings: 'http://localhost:8000/bookings',
		},
	},
});
