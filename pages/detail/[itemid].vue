<template>
<h4>kkkkkkk</h4>
<h4>kkkkkkk</h4>
<h4>kkkkkkk</h4>
<h4>kkkkkkk</h4>
<h4>kkkkkkk</h4>
    <div>{{itemId}}</div>
    <div>{{$route.params.itemid}}</div>
</template>
<script setup lang="ts">
const route = useRoute()
const itemId = route.params.itemid
</script>