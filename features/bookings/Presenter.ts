import { useBookingsStore } from '~/stores/bookings';
import { useTravelsStore } from '~/stores/travels';

export const actionGetBookings = () => useBookingsStore().getBookings();
export const actionGetUseFetchBookings = () =>
	useBookingsStore().getUseFetchBookings();

export const actionSetActiveStepForm = (type: 'prev' | 'next') =>
	useBookingsStore().setActiveStepForm(type);

export const actionSetTravelsList = () => {
	const travels = useTravelsStore().travels;

	const travelsList: TravelInfo[] = travels.map(t => ({
		id: t.id,
		name: t.name,
	}));

	return useBookingsStore().setTravelsList(travelsList);
};

export const actionAddBooking = (booking: Booking) =>
	useBookingsStore().addBooking(booking);

export const actionSetShowAddModal = () => useBookingsStore().setShowAddModal();

export const viewModel = () => {
	const bookingsStore = useBookingsStore();

	const activeStepForm = bookingsStore.activeStepForm;

	return {
		bookings: bookingsStore.bookings,
		activeStepForm: bookingsStore.activeStepForm,
		showBackBtn: activeStepForm !== 0,
		travelsList: bookingsStore.travelsList,
		showAddModal: bookingsStore.showAddModal,
		noBookingsFound: bookingsStore.bookings.length === 0,
		isLoadingAddBooking: bookingsStore.isLoadingAddBooking,
		showErrorMessage: bookingsStore.showErrorMessage,
	};
};
