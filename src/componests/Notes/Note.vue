<template>
     <div class="mb-2">
           <div
              class="w-full rounded overflow-hidden shadow-lg bg-white "
            >
                <!-- Card Content -->
                <div class="p-3">
                    <div class="text-gray-700 text-base">
                        {{ note.content }}
                        <div class="flex justify-between mt-1">
                            <small class="text-gray-400 p-1 px-2">{{dateFormatted  }}</small>
                            <small class="text-gray-400 p-1 px-2">{{ Characterlength }}</small>
                        </div>
                    </div>
                </div>
                <!-- Card Footer -->
                <footer class="flex border-t border-gray-200">
                    <RouterLink
                     :to="{ name: 'edit-note', params: { id: note.id } }"
                      class="flex-1 text-center py-1 px-4 text-blue-500 hover:bg-blue-100"
                      href="#"
                    >
                        Edit
                    </RouterLink>
                    <a
                      @click.prevent="modals.deleteNote = true"    
                      class="flex-1 text-center py-1 px-4 text-red-500 hover:bg-red-100"
                      href="#"
                    >
                        Delete
                    </a>
                </footer>
                <ModalDeleteNote
                 v-if="modals.deleteNote"
                 v-model="modals.deleteNote"
                 :noteId="note.id"
                />
            </div>
        </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core'
import { useStoreNotes } from '@/stores/storeNotes';
import ModalDeleteNote from '@/componests/Notes/ModalDeleteNote.vue';

const storeNotes = useStoreNotes()

const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.note.date))
    return useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
})

const props = defineProps({
    note:{
        type:Object,
        required: true
    }   
})

// const emit = defineEmits(['deleteClicked'])

const Characterlength = computed(() => {
    let length = props.note.content.length
    let description = length >1 ? 'characters' : 'character'
    return `${length}  ${description}`
})

const modals = reactive({
    deleteNote: false,
})

// const handleDeleteClicked = () => {
//     emit('deleteClicked', props.note.id)
// }
</script>