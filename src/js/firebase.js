import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCfV7ef6gUay1VOWvINp8IHF8b46-CS_TI',
  authDomain: 'noteballs-b5fc2.firebaseapp.com',
  projectId: 'noteballs-b5fc2',
  storageBucket: 'noteballs-b5fc2.appspot.com',
  messagingSenderId: '383516049616',
  appId: '1:383516049616:web:f934937a2e8b4e968a9ed5'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth
}