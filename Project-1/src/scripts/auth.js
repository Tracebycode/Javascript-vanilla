import { createUserWithEmailAndPassword, sendEmailVerification ,GoogleAuthProvider, 
    signInWithPopup } from 'firebase/auth';
import {auth} from './firebase.js';


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
        alert(`Hey !${user.displayName}, you signed successfully! kindly login to continue`);
        console.log("User signed in with Google:", user);
        return true;


    }catch(error){
        console.error("Error signing in with Google:", error);
        alert("Error signing in with Google. Please try again.");
        return false;
    };
    
    
    
    
}