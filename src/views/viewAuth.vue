<template>
    <div class="auth">
        <div class="flex justify-center">
            <ul class="flex space-x-4 border-b">
                <!-- Login Tab -->
                <li :class="{
                    'border-b-2 border-blue-500 font-semibold text-blue-500': !register,
                    'hover:border-gray-300 text-gray-600 hover:text-blue-500': register
                }" class="pb-2 text-sm cursor-pointer" @click.prevent="register = false">
                    <a>Login</a>
                </li>
                <!-- Register Tab -->
                <li :class="{
                    'border-b-2 border-blue-500 font-semibold text-blue-500': register,
                    'hover:border-gray-300 text-gray-600 hover:text-blue-500': !register
                }" class="pb-2 text-sm cursor-pointer" @click.prevent="register = true">
                    <a>Register</a>
                </li>
            </ul>
        </div>
        <div class="card mt-6 flex justify-center ">
            <div class="w-full  max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                <div class="text-2xl font-bold text-center mb-2">
                    {{ formTitle }}
                </div>
                <form
                 @submit.prevent="onSubmit"
                >
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <div>
                            <input
                                v-model="credentials.email"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email" placeholder="Enter a email">
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <div>
                            <input
                                 v-model="credentials.password"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password" placeholder="Enter a password">
                        </div>
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button
                            class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            {{ formTitle }}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed , reactive} from 'vue'
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth()

const register = ref(false)

const onSubmit = () => {
    if(!credentials.email || !credentials.password) {
        alert('Please enter an email and password godh darnit!')
    }
    else {
        if (register.value) {
            storeAuth.registerUser(credentials)
        }
        else {
            storeAuth.loginUser(credentials)
        }
    }
}


const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login';
});

const credentials = reactive({
    email: '',
    password: ''
})
</script>