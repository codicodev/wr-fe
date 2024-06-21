<template>
	<div class="md:flex items-center gap-4">
		<div class="mb-4 md:mb-0 max-w-52 md:min-w-72">
			<input
				type="text"
				placeholder="Filter a travel by name..."
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5"
				v-model="search"
				@input="searchHandler(search, selected)"
			/>
		</div>
		<div class="max-w-52 mb-4 md:mb-0">
			<select
				v-model="selected"
				@change="searchHandler(search, selected)"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5"
			>
				<option value="">Filter by rating</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</div>
		<div v-if="showClearFilters">
			<UButton color="black" variant="outline" @click="clear"
				>Clear filters</UButton
			>
		</div>
	</div>
</template>

<script setup lang="ts">
const search = ref('');
const selected = ref('');
const showClearFilters = ref(false);

interface Emits {
	(e: 'search', search: string, rating: number): void;
}

const emit = defineEmits<Emits>();

const clear = () => {
	search.value = '';
	selected.value = '';
	showClearFilters.value = false;
	emit('search', '', 0);
};

const searchHandler = (search: string, selected: string) => {
	if (search !== '' || selected !== '') {
		showClearFilters.value = true;
	} else {
		showClearFilters.value = false;
	}

	emit('search', search, parseInt(selected));
};
</script>
