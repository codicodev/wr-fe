<template>
	<p class="mt-8 text-center font-bold">
		{{ text }}
	</p>
</template>

<script setup lang="ts">
defineProps({
	text: String,
});
</script>
