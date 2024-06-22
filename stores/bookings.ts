import { defineStore } from 'pinia';
import gateway from '~/gateway/HttpGateway';
import type { ApiResponse } from '~/types';
import type { BookingApi } from '~/types/api/bookings/types';
import { toast } from 'vue3-toastify';

export interface Booking {
	id: string;
	travelId: string;
	customer: Customer;
	paymentType: PaymentType;
	notes?: string;
}

export interface Customer {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	age: number;
	gender: Gender;
}

export type Gender = 'male' | 'female' | 'other';

export type PaymentType = 'credit transfer' | 'paypal' | 'revolut';

export interface TravelInfo {
	id: string;
	name: string;
}

export interface BookingsState {
	bookings: Booking[];
	isLoading: boolean;
	travelsList: TravelInfo[];
	activeStepForm: number;
	showAddModal: boolean;
	isLoadingAddBooking: boolean;
	showErrorMessage: boolean;
}

//utils
const mapBookingDtoToPm = (booking: BookingApi): Booking => {
	return {
		id: booking.id,
		travelId: booking.travelId,
		customer: mapCustomerDtoToPm(booking.customer),
		paymentType: booking.paymentType,
		notes: booking.notes,
	};
};

const mapBookingPmToDto = (booking: Booking): BookingApi => {
	return {
		id: booking.id,
		travelId: booking.travelId,
		customer: mapCustomerPmToDto(booking.customer),
		paymentType: booking.paymentType,
		notes: booking.notes,
	};
};

const mapCustomerDtoToPm = (customer: CustomerApi): Customer => {
	return {
		id: customer.id,
		name: customer.name,
		email: customer.email,
		phoneNumber: customer.phoneNumber,
		age: customer.age,
		gender: customer.gender,
	};
};
const mapCustomerPmToDto = (customer: Customer): CustomerApi => {
	return {
		id: customer.id,
		name: customer.name,
		email: customer.email,
		phoneNumber: customer.phoneNumber,
		age: customer.age,
		gender: customer.gender,
	};
};

export const useBookingsStore = defineStore('bookingsStore', {
	state(): BookingsState {
		return {
			bookings: [],
			isLoading: false,
			travelsList: [],
			activeStepForm: 0,
			showAddModal: false,
			isLoadingAddBooking: false,
			showErrorMessage: false,
		};
	},
	actions: {
		async getUseFetchBookings() {
			const response: Ref<ApiResponse<BookingApi[]> | null> =
				await gateway.getUseFetch('/api/bookings');

			if (response && response.value && response.value.data) {
				const mappedBookings: Array<Booking> = response.value.data.map(
					t => mapBookingDtoToPm(t)
				);

				this.bookings = mappedBookings;
			} else {
				this.showErrorMessage = true;
			}
		},
		async getBookings() {
			this.isLoading = true;
			const bookingsDto: ApiResponse<BookingApi[]> = await gateway.get(
				'/api/bookings'
			);

			if (bookingsDto.data) {
				const mappedBookings = bookingsDto.data.map(booking =>
					mapBookingDtoToPm(booking)
				);
				this.bookings = mappedBookings;
			} else {
				this.showErrorMessage = true;
			}

			this.isLoading = false;
		},

		async addBooking(booking: Booking) {
			const bookingDto = mapBookingPmToDto(booking);
			this.isLoadingAddBooking = true;
			const res: ApiResponse<BookingApi> = await gateway.post(
				'/api/bookings',
				bookingDto
			);
			if (res.data) {
				const mappedBooking = mapBookingDtoToPm(res.data);
				this.bookings = this.bookings.concat(mappedBooking);
				toast.success('Booking added!', {
					autoClose: 1000,
				});
			} else {
				toast.error('Failed to add booking!', {
					autoClose: 1000,
				});
			}
			this.isLoadingAddBooking = false;
			this.showAddModal = !this.showAddModal;
			this.activeStepForm = 0;
		},

		setTravelsList(travelsList: TravelInfo[]) {
			this.travelsList = travelsList;
		},

		setActiveStepForm(type: 'prev' | 'next') {
			this.activeStepForm =
				type === 'prev'
					? this.activeStepForm - 1
					: this.activeStepForm + 1;
		},
		setShowAddModal() {
			this.showAddModal = !this.showAddModal;
			this.activeStepForm = 0;
		},
	},
});
