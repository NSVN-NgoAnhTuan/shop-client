<template>
    <div>
        <input type="text" v-model="username" placeholder="emailOrPhonenumber" />
        <input type="password" v-model="password" placeholder="password" />
        <button @click="login">Login</button>
        <p>{{ filtersStore.filtersList }}</p>
    </div>
</template>
<script setup>
import { useFiltersStore } from '../../store/filters';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const AuthRepository = RepositoryFactory.get('auth');

const filtersStore = useFiltersStore()

const username = ref('0946655100');
const password = ref('pass');

async function login() {
    try {
        await AuthRepository.login({
            "emailOrPhonenumber": username.value,
            "password": password.value
        });
        useRouter().push('/admin/upload');
    } catch (error) {
        console.log(error)
        //401 return login, filter, set permission
    }
}

definePageMeta({
    layout: false
})

</script>