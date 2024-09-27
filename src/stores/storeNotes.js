import { defineStore } from 'pinia'
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => ({
    notes: [],
    notesLoaded: false
  }),
  actions: {
    init () {
      const storeAuth = useStoreAuth()
       // 사용자 ID가 없으면 리턴 (예: 로그아웃 상태)
       if (!storeAuth.user.id) return;
      notesCollectionRef = collection(db, 'users', storeAuth.user.id,'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes () {
      this.notesLoaded = false

      if (getNotesSnapshot) getNotesSnapshot()

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach(doc => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      })

      // getNotesSnapshot()
    },
    clearNotes() {
      this.notes = []
    },
    unsubscribeSnapshot() {
      if (getNotesSnapshot) {
        getNotesSnapshot();
        getNotesSnapshot = null;
      }
    },
    async addNote (newNoteContent) {
      // newNoteContent가 비어 있지 않은지 확인
      if (!newNoteContent.trim()) return

      let currentDate = new Date().getTime()
      let date = currentDate.toString()

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })
    },
    async deleteNote (idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote (id, content) {
      const notesRef = doc(notesCollectionRef, id)
      await updateDoc(notesRef, {
        content
      })
    }
  },
  getters: {
    getNoteContent: state => {
      return id => {
        return state.notes.filter(note => {
          return note.id === id
        })[0].content
      }
    },
    totalNotesCount: state => {
      return state.notes.length
    },
    totalCharactersCount: state => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})
