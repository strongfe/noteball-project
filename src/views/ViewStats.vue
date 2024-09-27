<template>
    <div class="stats p-4 bg-gray-100 space-y-1">
        <table class="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
                <tr class="bg-gray-200">
                    <th class="px-4 py-2 text-left text-gray-600 font-medium border-b">Stat</th>
                    <th class="px-4 py-2 text-left text-gray-600 font-medium border-b">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="px-4 py-2 text-gray-800">Number of Notes</td>
                    <td class="px-4 py-2 text-gray-800">{{ storeNotes.totalNotesCount }}</td>
                </tr>
                <tr class="border-b">
                    <td class="px-4 py-2 text-gray-800">Number of Character (of all notes)</td>
                    <td class="px-4 py-2 text-gray-800">{{ storeNotes.totalCharactersCount }}</td>
                </tr>
            </tbody>
        </table>
        <input 
            v-model="loveNoteballs"
            class=" w-full border-collapse bg-white shadow-md rounded-md p-2" 
            type="text"
            v-autofocus
            placeholder="Do you love noteballs??" />
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useStoreNotes } from '@/stores/storeNotes';
import { vAutofocus } from '@/directives/vAutofocus';
import {useWatchCharacters} from '@/use/useWatchCharacters'

const storeNotes = useStoreNotes()

const loveNoteballs = ref('')

useWatchCharacters(loveNoteballs, 50)

</script>
