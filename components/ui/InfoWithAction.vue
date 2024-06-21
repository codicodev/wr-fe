<template>
    <div class="p-8">
        <p class="font-medium text-center mb-8">{{ text }}</p>
        <div class="text-center">
            <UButton variant="solid" color="black" @click="$emit('action')" :loading="isLoading">{{ btnLabel }}</UButton>
        </div>
    </div>
</template>

<script setup lang="ts">

    defineProps({
        text: String,
        btnLabel: String,
        isLoading: Boolean,
    })

    interface Emits {
        (e: "action") : void;
    }

    const emit = defineEmits<Emits>();

</script>