import  {handleloginwithgoogle} from './auth';



export function  loginform(params) {

    const parentcontainer = document.querySelector('.main');
    const loginBtn =document.getElementById('loginBtn');
    const overlay =document.createElement('div');
    overlay.className ="absolute inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"


    if(loginBtn){
    loginBtn.addEventListener('click',()=>{
        console.log("signup button clicked");
        parentcontainer.appendChild(overlay);
        const accountform = createaccountform();
        overlay.appendChild(accountform);

    const closeBtn= document.getElementById('closeModal');

        if(closeBtn){
            console.log("close button found");  
        closeBtn.addEventListener('click',()=>{
            overlay.removeChild(accountform);  
            parentcontainer.removeChild(overlay);
            console.log("close button clicked");
        })}
        
    })
}else{
    console.log("signup button not found");
    }
    
}





function createaccountform(){
    const accountform =document.createElement('div');
    accountform.className="max-w-md relative border-2 border-gray-300 bg-white shadow-md rounded-md items-center justify-center px-5 py-4 pt-8 pr-8";
    accountform.innerHTML=`
    
    <button id="closeModal" 
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold">
        &times;
    </button>

    <form id="loginform">
     
    <div class="mb-2">
    <label for="email" class="block  text-sm font-bold text-[#1da1f2]">Enter you email</label>
              <input type="text" id="useremail"  name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm" placeholder="Enter your gmail" required>
    </div >
    <div class="mb-2">
    <label for="Passward" class="block  text-sm font-bold text-[#1da1f2]">Enter you Passward</label>
              <input type="Passward" id="userpassward"  name="Passward" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm" placeholder="Enter your Passward" required>
    </div>
     <div class="flex justify-center ">
              <button type="submit" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">Login Here</button> 
      </div>

      <div class=" flex justify-center my-2">
        <p class=" text-[#1da1f2]">or continue with</div>

        <div class="flex justify-center space-x-3 my-2 py-3">
         
    
    <div>  
      <button type="button" class="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
        <span> Google</span>
    </button></div>
    <div>


  </form>
    
    `

    return accountform;

}