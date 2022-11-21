<template>
    <div>
        <NuxtLayout name="admin">
            <p>upload</p>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const AuthRepository = RepositoryFactory.get('auth');
try {
    await AuthRepository.test();
} catch (error) {
    console.log(error)
}
definePageMeta({
    layout: false,
})

</script>