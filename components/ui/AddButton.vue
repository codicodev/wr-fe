<template>
    <UButton variant="solid" color="black" icon="i-heroicons-plus"  @click="$emit('add-event')">{{ label }}</UButton>
</template>

<script setup lang="ts">

    defineProps({
        label: {type: String, required: true}
    })

    defineEmits(['add-event'])

</script>