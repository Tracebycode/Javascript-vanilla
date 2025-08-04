import { createUserWithEmailAndPassword, sendEmailVerification ,GoogleAuthProvider, 
    signInWithPopup } from 'firebase/auth';
import {auth, db} from './firebase.js';

import { doc,getDoc,setDoc } from 'firebase/firestore';


// Function to handle user signup


export async function handlesignupwithemail(email,Passward){
    try{
         const usercredential = await createUserWithEmailAndPassword(auth, email, Passward);
         const user = usercredential.user;
         alert("User created successfully");
         await sendEmailVerification(user);
         alert("Verification email sent to your email address. Please verify your account.");
         return true; // Indicate success



    } catch(error){
        console.error("Error signing up:", error);
        alert("Error signing up. Please try again.");
        return false;
    }
   
    

}

export  async function handlesignwithgoogle(){
    try{
        const provider =new GoogleAuthProvider();
       const usercredential= await signInWithPopup(auth,provider);
       const user = usercredential.user;


       const userRef = doc(db,"users",user.uid);
       const usersnap =await getDoc(userRef);


       if (usersnap.exists()) {
      
      alert(`Welcome back, ${user.displayName}! Redirecting to dashboard...`);
    } else {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
        provider: "google",
      })
    }

        return true;


    }catch(error){
        console.error("Error signing in with Google:", error);
        alert("Error signing in with Google. Please try again.");
        return false;
    };
    
    
    
    
}

export async function handleloginwithgoogle(){
    try{
        const provider =new GoogleAuthProvider();
        const usercredential = await signInWithPopup(auth,provider);
        const user = usercredential.user;

        const userRef = doc(db,"users",user.uid);
        const usersnap = await getDoc(userRef);

    if (usersnap.exists()) {
      alert(`Welcome back, ${user.displayName}! Redirecting to dashboard...`);
      return true;
    } else {
    //   await signOut(auth); // prevent access
      alert("No account found with this Google login. Please sign up first.");
      return false;
    }

  } catch (error) {
    console.error("Error signing in with Google:", error);
    alert("Google login failed. Please try again.");
    return false;
  }
}