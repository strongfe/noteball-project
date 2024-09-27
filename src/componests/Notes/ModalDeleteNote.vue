<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-2">
        <div ref="modalCardRef" class="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <header class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-semibold">Delete Note?</h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600" aria-label="close">
                    <!-- Close icon -->
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 11-1.414-1.414L8.586 10 3.636 5.05a1 1 0 011.414-1.414L10 8.586z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </header>
            <section class="px-6 py-4">
                <!-- Content ... -->
                <p class="text-gray-700">Are you sure you want to delete this note?</p>
            </section>
            <footer class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button class="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 border border-gray-300"
                    @click="closeModal">
                    Cancel
                </button>
                <button
                  @click="storeNotes.deleteNote(noteId)"
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreNotes } from '@/stores/storeNotes';

const storeNotes = useStoreNotes()


const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noteId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
    emit('update:modelValue', false)
}

const modalCardRef = ref(null)

// 모달 외부 클릭 시 닫힘 처리
onClickOutside(modalCardRef, closeModal)

const handleKeyboard = e => {
    if (e.key === 'Escape') closeModal()
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
})
</script>