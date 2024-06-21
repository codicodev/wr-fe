<template>
	<section>
		<HeadingPage
			title="Travels"
			subTitle="Here you can manage travels. Search, add, edit or delete them."
		/>

		<div class="flex items-center justify-between mb-4">
			<SearchTravel @search="actionSearchTravel" />

			<AddButton
				label="Add a new travel"
				@add-event="actionSetAddModal"
			/>
		</div>
		<TravelsList
			:travels="viewmodel.travels"
			@delete="actionSetDeleteModal"
			@edit="actionSetEditModal"
		/>

		<NotFoundData
			v-show="viewmodel.showNotFoundTravels"
			text="Travels not found"
		/>
		<ErrorRetrievingData v-show="viewmodel.showErrorMessage" />
		<BaseModal
			v-if="viewmodel.showEditModal && viewmodel.travelToEdit"
			@close-modal="actionSetEditModal"
		>
			<TravelFormEdit
				v-if="viewmodel.showEditModal && viewmodel.travelToEdit"
				:travel="viewmodel.travelToEdit"
				@submit="actionUpdateTravel"
				:isLoading="viewmodel.isLoadingUpdatingTravel"
			/>
		</BaseModal>
		<BaseModal
			v-if="viewmodel.showAddModal"
			@close-modal="actionSetAddModal"
		>
			<TravelFormAdd
				@submit="actionAddTravel"
				:isLoading="viewmodel.isLoadingAddingTravel"
			/>
		</BaseModal>
		<BaseModal
			v-if="viewmodel.showDeleteModal"
			@close-modal="actionSetDeleteModal"
		>
			<InfoWithAction
				text="Are you sure you want to delete this travel?"
				btnLabel="Delete"
				@action="actionDeleteTravel"
				:isLoading="viewmodel.isLoadingDeletingTravel"
			/>
		</BaseModal>
	</section>
</template>

<script setup lang="ts">
import {
	viewModel,
	actionAddTravel,
	actionSetDeleteModal,
	actionDeleteTravel,
	actionUpdateTravel,
	actionSetEditModal,
	actionSearchTravel,
	actionSetAddModal,
	actionGetUseFetchTravels,
} from '~/features/travels/Presenter';

await actionGetUseFetchTravels();

const viewmodel = computed(() => viewModel());
</script>
