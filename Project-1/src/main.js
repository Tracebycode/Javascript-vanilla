import {taskfromhandling} from './scripts/taskformhandle'
import { auth } from '/src/scripts/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
taskfromhandling()



 onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = '/index.html';
    } else {
      console.log('User is signed in:', user.email);
    }
  });



















