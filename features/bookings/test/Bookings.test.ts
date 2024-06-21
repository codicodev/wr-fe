import { setActivePinia, createPinia } from 'pinia';
import {
	describe,
	test,
	expect,
	beforeAll,
	beforeEach,
	afterEach,
	vi,
} from 'vitest';

import { useBookingsStore, type Booking } from '../../../stores/bookings';
import gateway from '../../../gateway/HttpGateway';
import {
	viewModel,
	actionSetActiveStepForm,
	actionGetBookings,
	actionAddBooking,
	actionGetUseFetchBookings,
} from '../Presenter';
import { bookingsStub, bookingsPostStub } from './stub/bookings.stub';
// @ts-ignore
global.$fetch = vi.fn();
// @ts-ignore
global.useFetch = vi.fn();

vi.mock('vue3-toastify');

beforeAll(() => {
	setActivePinia(createPinia());
});

describe('Bookings', () => {
	let store: ReturnType<typeof useBookingsStore>;

	beforeEach(() => {
		vi.clearAllMocks();
		store = useBookingsStore();

		gateway.getUseFetch = vi.fn().mockImplementationOnce(() =>
			Promise.resolve({
				pending: false,
				error: undefined,
				value: bookingsStub,
			})
		);

		gateway.get = vi
			.fn()
			.mockImplementationOnce(() => Promise.resolve(bookingsStub));

		gateway.post = vi
			.fn()
			.mockImplementationOnce(() => Promise.resolve(bookingsPostStub));
	});

	afterEach(() => {
		store.$reset();
	});

	test('should create a booking store', () => {
		expect(store).toBeDefined();
	});

	test('should get 2 bookings from database', async () => {
		await actionGetBookings();
		const viewmodel = viewModel();

		expect(viewmodel.bookings).toHaveLength(2);
		expect(viewmodel.bookings[0].customer.name).toBe('Mario Rossi');
	});

	test('should get 2 bookings from server', async () => {
		await actionGetUseFetchBookings();
		const viewmodel = viewModel();

		expect(viewmodel.bookings).toHaveLength(2);
		expect(viewmodel.bookings[0].customer.name).toBe('Mario Rossi');
	});

	test('should add a booking to database', async () => {
		const booking: Booking = {
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
		};

		await actionAddBooking(booking);

		const viewmodel = viewModel();

		expect(viewmodel.bookings).toHaveLength(1);
		expect(viewmodel.bookings[0].customer.name).toBe('Jenny Test');
	});

	test('should set active step form to 1', () => {
		actionSetActiveStepForm('next');

		const viewmodel = viewModel();

		expect(viewmodel.activeStepForm).toBe(1);
	});
});
