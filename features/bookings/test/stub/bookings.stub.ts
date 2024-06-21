export const bookingsStub = {
	status: 'ok',
	data: [
		{
			id: '1',
			travelId: '2',
			customer: {
				id: '123',
				name: 'Mario Rossi',
				email: 'mario@rossi.com',
				age: 18,
				phoneNumber: '33311122211',
				gender: 'male',
			},
			paymentType: 'credit transfer',
			notes: '',
		},
		{
			id: '2',
			travelId: '21',
			customer: {
				id: '1234',
				name: 'Anna Verdi',
				email: 'anna@verdi.com',
				age: 30,
				phoneNumber: '33311122211',
				gender: 'female',
			},
			paymentType: 'paypal',
			notes: 'I like to eat',
		},
	],
};

export const bookingsPostStub = {
	status: 'ok',
	data: {
		id: '3',
		travelId: '24',
		customer: {
			id: '1235',
			name: 'Jenny Test',
			email: 'Jenny@test.com',
			age: 28,
			phoneNumber: '33311122211',
			gender: 'female',
		},
		paymentType: 'revolut',
		notes: 'Some notes',
	},
};
