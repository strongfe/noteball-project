import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => ({
    user: {}
  }),
  actions: {
    init() {
      const storeNotes = useStoreNotes()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          storeNotes.init()
        } else {
          this.user = {}
          storeNotes.clearNotes()
          storeNotes.unsubscribeSnapshot()
          this.router.push('/auth')
        }
      });
    },
    registerUser (credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then(userCredential => {
          const user = userCredential.user
          console.log('user:', user)
        })
        .catch(error => {
          console.log('error.message:', error.message)
        })
    },
    logoutUser () {
      signOut(auth)
        .then(() => {
          console.log('User signed out')
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    loginUser (credentials) {
      signInWithEmailAndPassword(auth, credentials.email,
        credentials.password)
        .then(userCredential => {
          const user = userCredential.user
          console.log('signed in')
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }
})
