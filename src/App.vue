<template>
  <div class="min-h-screen  max-w-screen-md mx-auto flex flex-col bg-gray-100">
    <!-- NavBar 컴포넌트 -->
    <NavBar class="sticky top-0 z-50" />
    
    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-4 ">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NavBar from './componests/layout/NavBar.vue'
import { useStoreAuth } from './stores/storeAuth'

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})

</script>


