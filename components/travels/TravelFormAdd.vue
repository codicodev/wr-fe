<template>
	<div>
		<div class="bg-gray-50 p-4 mb-4">
			<h3 class="font-bold">Add a new travel</h3>
		</div>
		<div>
			<UForm
				:state="formState"
				:validate="validateTravelForm"
				@submit="onSubmit"
			>
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
					label="Description"
					name="description"
					class="mb-4"
					:required="true"
				>
					<UTextarea
						type="text"
						placeholder="Description"
						v-model="formState.description"
					/>
				</UFormGroup>
				<UFormGroup
					label="Image url E.g.: https://placehold.co/400x400/"
					name="image"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="text"
						placeholder="Image url"
						v-model="formState.image"
					/>
				</UFormGroup>
				<UFormGroup
					label="Start date"
					name="start_date"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="date"
						placeholder="Start date"
						v-model="formState.start_date"
					/>
				</UFormGroup>
				<UFormGroup
					label="End date"
					name="end_date"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="date"
						placeholder="End date"
						v-model="formState.end_date"
					/>
				</UFormGroup>
				<UFormGroup
					label="Price"
					name="price"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="text"
						placeholder="Price"
						v-model="formState.price"
					/>
				</UFormGroup>
				<UFormGroup
					label="Average user rating"
					name="average_user_rating"
					class="mb-4"
					:required="true"
				>
					<UInput
						type="number"
						placeholder="Average user rating"
						v-model="formState.average_user_rating"
					/>
				</UFormGroup>

				<UButton
					type="submit"
					variant="solid"
					color="black"
					:loading="isLoading"
					>Save travel</UButton
				>
			</UForm>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { v4 as uuid } from 'uuid';
import { validateTravelForm } from '~/utils/index';

interface Emits {
	(e: 'submit', state: Travel): void;
}

defineProps({
	isLoading: Boolean,
});

const emit = defineEmits<Emits>();

const initialState: Travel = {
	id: '',
	name: '',
	description: '',
	image: '',
	start_date: '',
	end_date: '',
	price: '',
	average_user_rating: 0,
};

const formState = ref({
	...initialState,
});

const resetForm = () => {
	Object.assign(formState.value, initialState);
};

async function onSubmit(event: FormSubmitEvent<Travel>) {
	const id = uuid();

	const addedTravel: Travel = {
		...formState.value,
		id,
	};
	emit('submit', addedTravel);
}

onUnmounted(() => {
	resetForm();
});
</script>
