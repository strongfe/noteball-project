import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/viewAuth.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: ViewNotes
    },
    {
        path: '/notes',
        name: 'notes',
        component: ViewNotes
    },
    {
        path: '/editNote/:id',
        name: 'edit-note',
        component: ViewEditNote
    },
    {
        path: '/stats',
        name: 'stats',
        component: ViewStats
    },
    {
        path: '/auth',
        name: 'auth',
        component: ViewAuth
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes  // routes:routes 
})

router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()
    console.log('to:', to)
    if (!storeAuth.user.id && to.name !== 'auth') {
        return {name: 'auth'}
    }
    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
})

export default router