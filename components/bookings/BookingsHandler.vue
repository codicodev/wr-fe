<template>
	<section>
		<HeadingPage
			title="Bookings"
			subTitle="Here you can manage bookings. Choose a destination, add some info and you are ready to go!"
		/>
		<div class="flex justify-end mb-4">
			<AddButton
				label="Add a new booking"
				@add-event="actionSetShowAddModal"
			/>
		</div>
		<BookingsList :bookings="viewmodel.bookings" />
		<NotFoundData
			v-if="viewmodel.noBookingsFound && !viewmodel.showErrorMessage"
			text="No booking found! Please add one."
		/>
		<ErrorRetrievingData v-show="viewmodel.showErrorMessage" />

		<BaseModal
			v-if="viewmodel.showAddModal"
			@close-modal="actionSetShowAddModal"
		>
			<BookingsAddForm
				:showBackBtn="viewmodel.showBackBtn"
				:activeFormStep="viewmodel.activeStepForm"
				:travelsList="viewmodel.travelsList"
				:isLoadingAddBooking="viewmodel.isLoadingAddBooking"
				@actionStep="actionSetActiveStepForm"
				@submit="actionAddBooking"
			/>
		</BaseModal>
	</section>
</template>

<script setup lang="ts">
import {
	viewModel,
	actionSetTravelsList,
	actionSetShowAddModal,
	actionSetActiveStepForm,
	actionAddBooking,
	actionGetUseFetchBookings,
} from '~/features/bookings/Presenter';
import { actionGetUseFetchTravels } from '~/features/travels/Presenter';

await actionGetUseFetchTravels();
await actionGetUseFetchBookings();

actionSetTravelsList();

const viewmodel = computed(() => viewModel());
</script>
