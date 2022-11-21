<template>

    <div>{{name}}</div>
</template>
<script setup lang="ts">
const route = useRoute()
const name = route.params.name
</script>