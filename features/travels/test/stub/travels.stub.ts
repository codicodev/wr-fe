export const travelsStub = {
	status: 'ok',
	data: [
		{
			id: '1',
			name: 'Go to Amsterdam',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			image: 'https://placehold.co/400x400/orange/white?text=Amsterdam',
			price: '100.00',
			average_user_rating: 2,
			start_date: '2024-08-12T09:43:30.514Z',
			end_date: '2024-08-15T09:43:30.514Z',
		},
		{
			id: '2',
			name: 'Go to Berlin',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			image: 'https://placehold.co/400x400/green/white?text=Berlin',
			price: '120.00',
			average_user_rating: 4,
			start_date: '2024-09-12T09:43:30.514Z',
			end_date: '2024-09-15T09:43:30.514Z',
		},
	],
};

export const travelsPostSuccessStub = {
	status: 'ok',
	data: {
		id: '1asdasdasd23',
		name: 'Go to New York',
		description: 'lorem ipsum',
		image: '',
		price: '100',
		average_user_rating: 4,
		start_date: '2024-08-12T09:43:30.514Z',
		end_date: '2024-08-15T09:43:30.514Z',
	},
};

export const travelsDeleteSuccessStub = {
	status: 'ok',
	data: {
		id: '2',
		name: 'Go to Berlin',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		image: 'https://placehold.co/400x400/green/white?text=Berlin',
		price: '120.00',
		average_user_rating: 4,
		start_date: '2024-09-12T09:43:30.514Z',
		end_date: '2024-09-15T09:43:30.514Z',
	},
};

export const travelsUpdateSuccessStub = {
	status: 'ok',
	data: {
		id: '2',
		name: 'Berlin is wonderful',
		description: 'asdasdasd',
		image: '',
		price: '100',
		average_user_rating: 4,
		start_date: '2024-08-12T09:43:30.514Z',
		end_date: '2024-08-15T09:43:30.514Z',
	},
};
