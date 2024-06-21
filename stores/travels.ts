import { defineStore } from 'pinia';
import gateway from '~/gateway/HttpGateway';
import type { ApiResponse } from '~/types';
import type { TravelFromApi } from '~/types/api/travels/types';
import { toast } from 'vue3-toastify';

export interface Travel {
	id: string;
	name: string;
	description: string;
	image: string;
	price: string;
	average_user_rating: number;
	start_date: string;
	end_date: string;
}

export interface TravelsState {
	travels: Travel[];
	filteredTravels: Travel[];
	isLoading: boolean;
	showErrorMessage: boolean;
	idSelected: string | null;
	showEditModal: boolean;
	selectedTravelToEdit: Travel | null;
	searchingMode: boolean;
	showAddModal: boolean;
	showDeleteModal: boolean;
	isLoadingAddingTravel: boolean;
	isLoadingUpdatingTravel: boolean;
	isLoadingDeletingTravel: boolean;
	searchName: string;
	searchRating: number;
}

//utils
const mapTravelDtoToPm = (t: TravelFromApi): Travel => {
	return {
		id: t.id,
		name: t.name,
		description: t.description,
		image: t.image,
		price: t.price,
		average_user_rating: t.average_user_rating,
		start_date: t.start_date,
		end_date: t.end_date,
	};
};

const mapTravelPmToDto = (t: Travel): TravelFromApi => {
	return {
		id: t.id,
		name: t.name,
		description: t.description,
		image: t.image,
		price: t.price,
		average_user_rating: t.average_user_rating,
		start_date: t.start_date,
		end_date: t.end_date,
	};
};

export const useTravelsStore = defineStore('travelsStore', {
	state: (): TravelsState => {
		return {
			travels: [],
			filteredTravels: [],
			isLoading: false,
			showErrorMessage: false,
			idSelected: null,
			showEditModal: false,
			selectedTravelToEdit: null,
			searchingMode: false,
			showAddModal: false,
			showDeleteModal: false,
			isLoadingAddingTravel: false,
			isLoadingUpdatingTravel: false,
			isLoadingDeletingTravel: false,
			searchName: '',
			searchRating: 0,
		};
	},
	actions: {
		async getUseFetchTravels() {
			const response: Ref<ApiResponse<TravelFromApi[]> | null> =
				await gateway.getUseFetch('/api/travels');

			if (response && response.value && response.value.data) {
				const mappedTravels: Array<Travel> = response.value.data.map(
					t => mapTravelDtoToPm(t)
				);

				this.travels = mappedTravels;
			} else {
				this.showErrorMessage = true;
			}
		},
		async getTravels() {
			this.isLoading = true;
			const travelsDto: ApiResponse<TravelFromApi[]> = await gateway.get(
				'/api/travels'
			);
			if (travelsDto.data) {
				const mappedTravels: Array<Travel> = travelsDto.data.map(t =>
					mapTravelDtoToPm(t)
				);

				this.travels = mappedTravels;
			} else {
				this.showErrorMessage = true;
			}
			this.isLoading = false;
		},
		async addTravel(travel: Travel) {
			const travelDto = mapTravelPmToDto(travel);

			this.isLoadingAddingTravel = true;
			const res: ApiResponse<TravelFromApi> = await gateway.post(
				'/api/travels',
				travelDto
			);
			if (res.data) {
				const mappedTravel = mapTravelDtoToPm(res.data);
				this.travels = this.travels.concat(mappedTravel);
				toast.success('Travel added!', {
					autoClose: 1000,
				});
			} else {
				toast.error('Error creating a travel!', {
					autoClose: 1000,
				});
			}

			this.isLoadingAddingTravel = false;
			this.showAddModal = false;
		},
		async deleteTravel() {
			if (this.idSelected) {
				this.isLoadingDeletingTravel = true;
				const res: ApiResponse<TravelFromApi> = await gateway.delete(
					'/api/travels',
					this.idSelected
				);
				if (res.data) {
					this.travels = this.travels.filter(
						travel => travel.id !== this.idSelected
					);
					toast.success('Travel deleted!', {
						autoClose: 1000,
					});
				} else {
					toast.error('Error deleting a travel!', {
						autoClose: 1000,
					});
				}

				this.showDeleteModal = false;
				this.idSelected = null;
				this.isLoadingDeletingTravel = false;
			}
		},

		async updateTravel(id: string, travel: Travel) {
			const travelDto = mapTravelPmToDto(travel);
			this.isLoadingUpdatingTravel = true;
			const res: ApiResponse<TravelFromApi> = await gateway.update(
				'/api/travels',
				id,
				travelDto
			);

			if (res.data) {
				const travelIndex = this.travels.findIndex(
					travel => travel.id === id
				);
				this.travels[travelIndex] = res.data;

				toast.success('Travel updated!', {
					autoClose: 1000,
				});

				this.searchTravel(this.searchName, this.searchRating);
			} else {
				toast.error('Error updating a travel!', {
					autoClose: 1000,
				});
			}

			this.isLoadingUpdatingTravel = false;
			this.showEditModal = false;
			this.selectedTravelToEdit = null;
		},
		setEditModal(id: string) {
			this.showEditModal = !this.showEditModal;
			this.idSelected = this.showEditModal ? id : null;
			if (this.showEditModal) {
				const findIndex = this.travels.findIndex(
					travel => travel.id === id
				);
				this.selectedTravelToEdit = this.travels[findIndex];
			} else {
				this.selectedTravelToEdit = null;
			}
		},

		setAddModal() {
			this.showAddModal = !this.showAddModal;
		},

		setDeleteModal(id: string) {
			this.showDeleteModal = !this.showDeleteModal;
			this.idSelected = this.showDeleteModal ? id : null;
		},

		searchTravel(search: string, rating: number) {
			this.searchName = search;
			this.searchRating = rating;

			if (search && !rating) {
				this.filteredTravels = this.travels.filter(travel =>
					travel.name.toLowerCase().includes(search.toLowerCase())
				);

				this.searchingMode = true;
			} else if (rating && !search) {
				this.filteredTravels = this.travels.filter(
					travel => travel.average_user_rating === rating
				);
				this.searchingMode = true;
			} else if (search && rating) {
				this.filteredTravels = this.travels.filter(
					travel =>
						travel.name
							.toLowerCase()
							.includes(search.toLowerCase()) &&
						travel.average_user_rating === rating
				);
				this.searchingMode = true;
			} else {
				this.filteredTravels = [];
				this.searchingMode = false;
			}
		},
	},
});
