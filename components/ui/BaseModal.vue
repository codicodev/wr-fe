<template>
    <div class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-40 overflow-y-scroll">
        <div class="w-full p-4 bg-white self-start mt-12 max-w-screen-md z-50" >
            <div class="flex justify-end mb-3">
                <UButton size="xl" icon="i-heroicons-x-mark" color="black" variant="link" @click="$emit('close-modal')"></UButton>
            </div>
            <slot />
        </div>
    </div>
</template> 

<script setup lang="ts">
    defineEmits(['close-modal'])
</script>