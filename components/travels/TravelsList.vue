<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3  min-w-36 md:max-w-36">
                        Image
                    </th>
                    <th scope="col" class="px-6 py-3 min-w-52">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3 w-64">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3 min-w-36">
                        Start date
                    </th>
                    <th scope="col" class="px-6 py-3 min-w-36">
                        End date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Ratings
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="travel in travels" :key="travel.id" class="odd:bg-white even:bg-gray-50">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div>
                            <img :src="travel.image" />
                        </div>
                    </th>
                    <td class="px-6 py-4">
                        <p>{{ travel.name }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <p class="line-clamp-1">{{ travel.description }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <p>{{ new Date(travel.start_date).toISOString().substring(0, 10) }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <p>{{ new Date(travel.end_date).toISOString().substring(0, 10) }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <p>{{ travel.price }}$</p>
                    </td>
                    <td class="px-6 py-4">
                        <p>{{ travel.average_user_rating }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex gap-2">
                            <UButton icon="i-heroicons-pencil-square" size="xs" color="black" variant="link"  @click="emit('edit', travel.id)">Edit</UButton>
                            <UButton icon="i-heroicons-trash" size="xs" color="black" variant="link" @click="emit('delete', travel.id)">Delete</UButton>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">

interface Emits {
    (e: "delete", id: string): Promise<void>;
    (e: "edit", id: string) : void;
}

    defineProps({
        travels: Array<Travel>
    })

    const emit = defineEmits<Emits>();
  
</script>