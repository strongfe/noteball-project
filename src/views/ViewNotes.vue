<template>
  <div class="notes">
    <div>
      <addEditNote v-model="newNote" placeholder="Add a new note" label="Add a note" ref="addEditNoteRef">
        <template #buttons>
          <button :disabled="!newNote" @click="addNote"
            class="px-2 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Add New Note
          </button>
        </template>
      </addEditNote>
      <!-- 프로그레스 바 -->
      <div v-if="!storeNotes.notesLoaded" class="relative w-full h-6 bg-gray-200 rounded overflow-hidden mb-3">
        <div class="absolute left-0 top-0 h-full bg-red-200 transition-all duration-[2000ms] ease-out"
          :style="{ width: progressWidth + '%' }">Loading....
        </div>
      </div>
      <!-- 노트 리스트 (로딩이 완료된 후 표시) -->
      <div v-else>
        <template v-if="storeNotes.notes.length">
          <!-- 노트가 있을 때 -->
          <Note v-for="note in storeNotes.notes" :key="note.id" :note="note"
            class="w-full rounded overflow-hidden shadow-lg bg-white mb-2" />
        </template>
        <div v-else class="w-full rounded overflow-hidden shadow-lg bg-white text-center py-8">
          <!-- 노트가 없을 때 -->
          No notes here yet...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Note from '@/componests/Notes/Note.vue'
import addEditNote from '@/componests/Notes/addEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'

const storeNotes = useStoreNotes()
const newNote = ref('')
const addEditNoteRef = ref(null)
// 노트 추가 함수
const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''; // 입력 필드 초기화

  // 추가 후에 addEditNote 컴포넌트의 textarea로 포커스 이동
  addEditNoteRef.value.focusTextarea()
};

useWatchCharacters(newNote)


// 반응형 변수 선언
const progressWidth = ref(0)

// 진행 바를 시작하는 함수
const startProgress = () => {
  progressWidth.value = 0; // 초기화
  const interval = setInterval(() => {
    // console.log(progressWidth.value) // 콘솔에 현재 값 출력
    if (progressWidth.value < 99) {
      progressWidth.value += 5 // 5%씩 증가
    } else {
      clearInterval(interval) // 95%에 도달하면 인터벌 정지
    }
  }, 50); // 100ms 간격
};

// 노트 로딩 상태 감지 및 프로그레스 바 애니메이션 초기화
watch(() => storeNotes.notesLoaded, (loaded) => {
  //   console.log(storeNotes.notesLoaded)
  if (!loaded) {
    startProgress()
  } else {
    progressWidth.value = 100
  }
}, { immediate: true });




</script>
