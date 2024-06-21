<template>
    <section class="mb-4">
        <h2 class="mb-2 text-2xl font-bold md:text-3xl">{{ title }}</h2>
        <p class="text-sm md:text-base">{{ subTitle }}</p>
    </section>
</template>

<script setup lang="ts">

    defineProps({
        title: String,
        subTitle: String,
    })

</script>