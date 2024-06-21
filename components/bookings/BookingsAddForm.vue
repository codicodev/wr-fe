<template>
	<div>
		<div class="bg-gray-50 p-4 mb-2">
			<h3 class="font-bold">Add a new booking</h3>
		</div>
		<div class="bg-gray-50 p-4 mb-4">
			<p class="font-bold text-center">Step {{ activeFormStep + 1 }}/3</p>
		</div>
		<UForm :state="formState" :validate="validate" @submit="onSubmit">
			<template v-if="activeFormStep === 0">
				<h3 class="font-bold mb-4">1 - Where do you wanna go?</h3>

				<div>
					<UFormGroup
						label="Search and select a travel"
						name="travel_id"
						class="mb-4"
						:required="true"
					>
						<UInputMenu
							placeholder="Search and select a travel"
							v-model="formState.travel_id"
							:options="travelsList"
							option-attribute="name"
						/>
					</UFormGroup>
				</div>
			</template>

			<template v-if="activeFormStep === 1">
				<h3 class="font-bold mb-4">2 - Personal information</h3>
				<UFormGroup
					label="Name"
					name="name"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="text"
						placeholder="Name"
						v-model="formState.name"
					/>
				</UFormGroup>
				<UFormGroup
					label="Email"
					name="email"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="text"
						placeholder="Email"
						v-model="formState.email"
					/>
				</UFormGroup>
				<UFormGroup
					label="Phone Number"
					name="phoneNumber"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="text"
						placeholder="Phone Number"
						v-model="formState.phoneNumber"
					/>
				</UFormGroup>
				<UFormGroup
					label="Age"
					name="age"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="number"
						placeholder="Age"
						v-model="formState.age"
					/>
				</UFormGroup>
				<UFormGroup
					label="Gender"
					name="gender"
					class="mb-4"
					:required="true"
				>
					<USelect
						placeholder="Gender"
						v-model="formState.gender"
						:options="genders"
					/>
				</UFormGroup>
			</template>

			<template v-if="activeFormStep === 2">
				<h3 class="font-bold mb-4">
					3 - Payments information and notes
				</h3>
				<UFormGroup
					label="Payment type"
					name="paymentType"
					class="mb-4"
					:required="true"
				>
					<USelect
						placeholder="Payment type"
						v-model="formState.paymentType"
						:options="paymentsType"
					/>
				</UFormGroup>
				<UFormGroup label="Notes" name="notes" class="mb-4">
					<UTextarea
						type="text"
						placeholder="Notes"
						v-model="formState.notes"
					/>
				</UFormGroup>
			</template>

			<div class="flex gap-10 justify-center mt-10">
				<UButton
					color="black"
					v-if="showBackBtn"
					@click="$emit('actionStep', 'prev')"
					>Back</UButton
				>
				<UButton
					v-if="activeFormStep === 2"
					type="submit"
					variant="solid"
					color="black"
					:loading="isLoadingAddBooking"
					>Save booking</UButton
				>
				<UButton
					v-if="activeFormStep !== 2"
					type="submit"
					variant="solid"
					color="black"
					>Next</UButton
				>
			</div>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';
import { validateEmail, validatePhoneNumber } from '~/utils/index';
import { v4 as uuid } from 'uuid';

interface Emits {
	(e: 'submit', booking: Booking): Promise<void>;
	(e: 'actionStep', type: 'prev' | 'next'): void;
}

const props = defineProps({
	showBackBtn: { type: Boolean, required: true },
	isLoadingAddBooking: { type: Boolean, required: true },
	activeFormStep: { type: Number, required: true },
	travelsList: { type: Array<TravelInfo>, required: true },
});

const emit = defineEmits<Emits>();

const genders: Gender[] = ['male', 'female', 'other'];
const paymentsType: PaymentType[] = ['credit transfer', 'paypal', 'revolut'];

const validate = (state: BookingForm): FormError[] => {
	const errors = [];
	if (!state.travel_id && props.activeFormStep === 0)
		errors.push({
			path: 'travel_id',
			message: 'Required. Please select a travel',
		});
	if (!state.name && props.activeFormStep === 1)
		errors.push({ path: 'name', message: 'Required' });
	if (
		(!state.email || !validateEmail(state.email)) &&
		props.activeFormStep === 1
	)
		errors.push({
			path: 'email',
			message: 'Required. It has to be a valid email',
		});
	if (
		(!state.phoneNumber || !validatePhoneNumber(state.phoneNumber)) &&
		props.activeFormStep === 1
	)
		errors.push({
			path: 'phoneNumber',
			message: 'Required. It must have 10 digits.',
		});
	if (!state.age && props.activeFormStep === 1)
		errors.push({ path: 'age', message: 'Required' });
	if (!state.gender && props.activeFormStep === 1)
		errors.push({ path: 'gender', message: 'Required' });
	if (!state.paymentType && props.activeFormStep === 2)
		errors.push({ path: 'paymentType', message: 'Required' });

	return errors;
};

export type BookingForm = {
	travel_id: { id: string; name: string } | undefined;
	name: string;
	email: string;
	phoneNumber: string;
	age: number | undefined;
	gender: Gender | undefined;
	paymentType: PaymentType | undefined;
	notes: string | undefined;
};

const initialState: BookingForm = {
	travel_id: undefined,
	name: '',
	email: '',
	phoneNumber: '',
	age: undefined,
	gender: undefined,
	paymentType: undefined,
	notes: undefined,
};

const formState = ref({
	...initialState,
});

async function onSubmit(event: FormSubmitEvent<BookingForm>) {
	const id = uuid();

	if (props.activeFormStep < 2) {
		emit('actionStep', 'next');
	} else {
		const bookingData: Booking = {
			id,
			travelId: event.data.travel_id!!.id,
			customer: {
				id: uuid(),
				name: event.data.name,
				email: event.data.email,
				phoneNumber: event.data.phoneNumber,
				age: event.data.age!!,
				gender: event.data.gender!!,
			},
			paymentType: event.data.paymentType!!,
			notes: event.data.notes,
		};

		emit('submit', bookingData);
	}
}
</script>
