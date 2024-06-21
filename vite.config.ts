import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
export default defineConfig({
	test: {
		include: ['./features/*/test/*.test.ts'],
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'#imports': resolve(__dirname, './'),
			'~': resolve(__dirname, './'),
		},
	},
});
