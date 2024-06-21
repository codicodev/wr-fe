<template>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-center rtl:text-right text-gray-500">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50">
				<tr>
					<th scope="col" class="px-6 py-3 max-w-32">Travel Id</th>
					<th scope="col" class="px-6 py-3 min-w-32">Name</th>
					<th scope="col" class="px-6 py-3 w-32">Email</th>
					<th scope="col" class="px-6 py-3 min-w-32">Phone number</th>
					<th scope="col" class="px-6 py-3 min-w-32">Age</th>
					<th scope="col" class="px-6 py-3 max-w-32">Gender</th>
					<th scope="col" class="px-6 py-3 max-w-32">Payment type</th>
					<th scope="col" class="px-6 py-3 min-w-52">Notes</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="booking in bookings"
					:key="booking.id"
					class="odd:bg-white even:bg-gray-50"
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 max-w-32"
					>
						<p class="truncate ...">
							<span>{{ booking.travelId }}</span>
						</p>
					</th>
					<td class="px-6 py-4">
						<p>{{ booking.customer.name }}</p>
					</td>
					<td class="px-6 py-4">
						<p>{{ booking.customer.email }}</p>
					</td>
					<td class="px-6 py-4">
						<p>{{ booking.customer.phoneNumber }}</p>
					</td>
					<td class="px-6 py-4">
						<p>{{ booking.customer.age }}</p>
					</td>
					<td class="px-6 py-4">
						<p>{{ booking.customer.gender }}</p>
					</td>
					<td class="px-6 py-4">
						<p>{{ booking.paymentType }}</p>
					</td>
					<td class="px-6 py-4">
						<p>{{ booking.notes }}</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup lang="ts">
defineProps({
	bookings: Array<Booking>,
});
</script>
