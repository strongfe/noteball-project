<template>
    <nav class="bg-white shadow-md p-4 md:flex md:justify-between md:items-center">
        <div class="flex justify-between items-center">
            <!-- 로고 -->
            <RouterLink to="/" class="text-2xl font-bold text-gray-800">
                Illowa hotel
            </RouterLink>

            <!-- 햄버거 메뉴 버튼 -->
            <button @click="toggleMenu" class="text-gray-800 focus:outline-none md:hidden" ref="navbarBurgerRef">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7">
                    </path>
                </svg>
            </button>
        </div>

        <!-- 메뉴 항목들 -->
        <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }" class="md:flex md:items-center md:space-x-4"
            ref="navbarMenuRef">
            <div class="navbar-start">
                <button
                  v-if="storeAuth.user.id"  
                  @click="logout"
                  class="button bg-blue-300 px-2 py-1"
                >
                    Log out {{ storeAuth.user.email }}
                </button>
            </div>
            <!-- Notes 링크 -->
            <RouterLink to="/notes" :class="[
                'block mt-2 md:mt-0 text-gray-800 hover:text-white hover:bg-blue-500 active:bg-blue-700 p-2 rounded transition duration-200',
                isNotesActive ? 'bg-gray-200' : ''
            ]" @click="toggleMenu">
                Notes
            </RouterLink>

            <!-- Stats 링크 -->
            <RouterLink to="/stats" :class="[
                'block mt-2 md:mt-0 text-gray-800 hover:text-white hover:bg-blue-500 active:bg-blue-700 p-2 rounded transition duration-200',
                isStatsActive ? 'bg-gray-200' : ''
            ]" @click="toggleMenu">
                Stats
            </RouterLink>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth()

// 메뉴 열림/닫힘 상태를 관리
const isMenuOpen = ref(false);

const navbarMenuRef = ref(null)

const navbarBurgerRef = ref(null)

onClickOutside(navbarMenuRef, event => {
    isMenuOpen.value = false
}, {
    ignore: [navbarBurgerRef]
})

// 메뉴 상태를 토글하는 함수
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// 현재 경로를 가져오기 위해 useRoute 훅 사용
const route = useRoute();

// 현재 경로와 비교하여 활성화된 상태를 반환하는 computed 속성
const isNotesActive = computed(() => route.path === '/notes');
const isStatsActive = computed(() => route.path === '/stats');

const logout = () => {
    storeAuth.logoutUser()
    isMenuOpen.value = false    
}
</script>