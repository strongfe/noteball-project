<template>
    <div class="edit-note">
        <addEditNote 
         v-model="noteContent"
         bgColor="bg-blue-300"
         placeholder="Edit note"
         label="Edit Note"
         ref="addEditNoteRef">
            <template #buttons>
                <button 
                    @click="$router.back()"
                    class="px-2 py-1 bg-white text-sm font-semibold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Cancel
                </button>
                <button 
                    @click="handleSaveClicked"
                    class="px-2 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Save Note
                </button>
            </template>
        </addEditNote>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import addEditNote from '@/componests/Notes/addEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

const route = useRoute()
const router = useRouter()

const storeNotes = useStoreNotes()

const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
}

</script>