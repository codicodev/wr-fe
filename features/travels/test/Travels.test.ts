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

import { useTravelsStore } from '../../../stores/travels';
import gateway from '../../../gateway/HttpGateway';
import {
	actionGetTravels,
	viewModel,
	actionAddTravel,
	actionDeleteTravel,
	actionUpdateTravel,
	actionSearchTravel,
	actionSetDeleteModal,
	actionGetUseFetchTravels,
} from '../Presenter';
import {
	travelsStub,
	travelsPostSuccessStub,
	travelsDeleteSuccessStub,
	travelsUpdateSuccessStub,
} from './stub/travels.stub';

vi.mock('vue3-toastify');

// @ts-ignore
global.$fetch = vi.fn();
// @ts-ignore
global.useFetch = vi.fn();

beforeAll(() => {
	setActivePinia(createPinia());
});

describe('Travels', () => {
	let store: ReturnType<typeof useTravelsStore>;

	beforeEach(() => {
		vi.clearAllMocks();
		store = useTravelsStore();

		gateway.getUseFetch = vi.fn().mockImplementationOnce(() =>
			Promise.resolve({
				pending: false,
				error: undefined,
				value: travelsStub,
			})
		);
		gateway.get = vi
			.fn()
			.mockImplementationOnce(() => Promise.resolve(travelsStub));

		gateway.post = vi
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve(travelsPostSuccessStub)
			);
		gateway.delete = vi
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve(travelsDeleteSuccessStub)
			);
		gateway.update = vi
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve(travelsUpdateSuccessStub)
			);
	});

	afterEach(() => {
		store.$reset();
	});

	test('should create a travel store', () => {
		expect(store).toBeDefined();
	});

	test('should load 2 travels from the database', async () => {
		await actionGetTravels();
		const viewmodel = viewModel();
		expect(viewmodel.travels).toHaveLength(2);
	});

	test('should load 2 travels from the server', async () => {
		await actionGetUseFetchTravels();
		const viewmodel = viewModel();

		expect(viewmodel.travels).toHaveLength(2);
	});

	test('should add a new travel', async () => {
		await actionAddTravel({
			id: '1asdasdasd23',
			name: 'Go to New York',
			description: 'lorem ipsum',
			image: '',
			price: '100',
			average_user_rating: 4,
			start_date: '2024-08-12T09:43:30.514Z',
			end_date: '2024-08-15T09:43:30.514Z',
		});

		const viewmodel = viewModel();

		expect(gateway.post).toHaveBeenCalledWith('/api/travels', {
			id: '1asdasdasd23',
			name: 'Go to New York',
			description: 'lorem ipsum',
			image: '',
			price: '100',
			average_user_rating: 4,
			start_date: '2024-08-12T09:43:30.514Z',
			end_date: '2024-08-15T09:43:30.514Z',
		});

		expect(viewmodel.travels).toHaveLength(1);
		expect(viewmodel.travels[0].name).toBe('Go to New York');
		expect(viewmodel.travels[0].id).toBe('1asdasdasd23');
	});

	test('should delete a travel ', async () => {
		await actionGetTravels();

		actionSetDeleteModal('2');
		await actionDeleteTravel();

		expect(gateway.delete).toHaveBeenCalledWith('/api/travels', '2');

		const viewmodel = viewModel();

		expect(viewmodel.travels).toHaveLength(1);
	});

	test('should update a travel', async () => {
		await actionGetTravels();

		await actionUpdateTravel('2', {
			id: '2',
			name: 'Berlin is wonderful',
			description: 'asdasdasd',
			image: '',
			price: '100',
			average_user_rating: 4,
			start_date: '2024-08-12T09:43:30.514Z',
			end_date: '2024-08-15T09:43:30.514Z',
		});

		expect(gateway.update).toHaveBeenCalledWith('/api/travels', '2', {
			id: '2',
			name: 'Berlin is wonderful',
			description: 'asdasdasd',
			image: '',
			price: '100',
			average_user_rating: 4,
			start_date: '2024-08-12T09:43:30.514Z',
			end_date: '2024-08-15T09:43:30.514Z',
		});

		const viewmodel = viewModel();

		expect(viewmodel.travels).toHaveLength(2);
		expect(viewmodel.travels[1].name).toBe('Berlin is wonderful');
	});

	test('should filter travels by name', async () => {
		await actionGetTravels();

		actionSearchTravel('Berlin', 0);

		const viewmodel = viewModel();

		expect(viewmodel.travels).toHaveLength(1);
		expect(viewmodel.travels[0].name).toBe('Go to Berlin');
	});
	test('should filter travels by rating', async () => {
		await actionGetTravels();

		actionSearchTravel('', 2);

		const viewmodel = viewModel();

		expect(viewmodel.travels).toHaveLength(1);
		expect(viewmodel.travels[0].name).toBe('Go to Amsterdam');
	});

	test('should filter travels by name and rating', async () => {
		await actionGetTravels();

		actionSearchTravel('Amsterd', 2);

		const viewmodel = viewModel();

		expect(viewmodel.travels).toHaveLength(1);
		expect(viewmodel.travels[0].name).toBe('Go to Amsterdam');
	});
});
