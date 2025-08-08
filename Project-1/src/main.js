
import {taskfromhandling} from './scripts/Dashboad/taskformhandle'
import { auth } from '/src/scripts/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { listentoTask } from './scripts/Dashboad/Card.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("No user is signed in, redirecting to login page");
    window.location.href = '/index.html';
  }else{
    console.log("User is signed in:", user.displayName);
    const currentuserpicture =  user.photoURL || '/default-profile.png'; // Fallback to a default image if no photoURL
    const profilePic = document.getElementById('navbar-profile-pic');
    if (profilePic) {
      profilePic.src = currentuserpicture; // Set the profile picture in the navbar
    }
    console.log("Profile picture set to:", currentuserpicture);
    listentoTask(user.uid); // Listen to tasks for the current user

  }
});

const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', async(e)=>{
      console.log("Logout button clicked");
        e.preventDefault();
        try {
            await auth.signOut();
            console.log("User Signed Out Sucessfully");
            window.location.href ='/index.html';
        } catch (error) {
            console.error("Error signing out:", error);
        }
    })
}





// Initialize task form handling
taskfromhandling();



// You can use `currentusername` in your application logic as needed






















