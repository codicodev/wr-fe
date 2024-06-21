import { useTravelsStore } from '~/stores/travels';

export const actionGetUseFetchTravels = () =>
	useTravelsStore().getUseFetchTravels();
export const actionGetTravels = () => useTravelsStore().getTravels();

export const actionAddTravel = (travel: Travel) =>
	useTravelsStore().addTravel(travel);

export const actionDeleteTravel = () => useTravelsStore().deleteTravel();

export const actionUpdateTravel = (id: string, travel: Travel) =>
	useTravelsStore().updateTravel(id, travel);

export const actionSetEditModal = (id: string) =>
	useTravelsStore().setEditModal(id);

export const actionSetDeleteModal = (id: string) =>
	useTravelsStore().setDeleteModal(id);

export const actionSetAddModal = () => useTravelsStore().setAddModal();

export const actionSearchTravel = (search: string, rating: number) =>
	useTravelsStore().searchTravel(search, rating);

export const viewModel = () => {
	const travelStore = useTravelsStore();

	return {
		travels: !travelStore.searchingMode
			? travelStore.travels
			: travelStore.filteredTravels,
		showNotFoundTravels:
			travelStore.searchingMode &&
			travelStore.filteredTravels.length === 0,
		isLoading: travelStore.isLoading,
		showErrorMessage: travelStore.showErrorMessage,
		showEditModal: travelStore.showEditModal,
		showAddModal: travelStore.showAddModal,
		showDeleteModal: travelStore.showDeleteModal,
		idSelected: travelStore.idSelected,
		travelToEdit:
			travelStore.selectedTravelToEdit &&
			travelStore.selectedTravelToEdit,
		isLoadingAddingTravel: travelStore.isLoadingAddingTravel,
		isLoadingUpdatingTravel: travelStore.isLoadingUpdatingTravel,
		isLoadingDeletingTravel: travelStore.isLoadingDeletingTravel,
	};
};
