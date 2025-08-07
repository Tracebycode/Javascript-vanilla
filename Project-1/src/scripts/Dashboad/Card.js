import {db} from '../firebase.js';
import {collection,addDoc} from 'firebase/firestore';

export async function addtask(taskDetails,userId){
  try{
     const taskcollectionRef =collection(db,`users/${userId}/tasks`)
     const docRef = await addDoc(taskcollectionRef,{
        ...taskDetails,})

          return { id: docRef.id, ...taskDetails };

  }catch(error){
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }

}
 
 
 
 export function addtaskcard(task){ 
  const card = document.createElement('div');
card.className = "taskcard bg-white shadow-md flex justify-between items-center mx-4 my-2 px-4 py-3 rounded-lg border border-gray-200 w-7/8";

// Build a compact horizontal layout
card.innerHTML = `
  <div class="flex flex-col">
    <h2 class="text-base font-semibold text-gray-800">${task.taskTitle}</h2>
    <p class="text-sm text-gray-500">${task.taskDueDate} • ${task.taskPriority} • ${task.taskStatus}</p>
  </div>

  <div class="flex items-center gap-2 text-sm text-gray-600">
    <button class="toggleBtn text-blue-600 hover:underline">Details</button>
    <button class="text-yellow-500 hover:text-yellow-600">Edit</button>
    <button class="text-red-500 hover:text-red-600">Delete</button>
  </div>
`;

// Add the hidden expandable section if needed
const moreDetails = document.createElement('div');
moreDetails.className = "moreDetails hidden text-sm text-gray-600 mt-2 w-full px-4";
moreDetails.innerHTML = `
  <p><span class="font-semibold">Category:</span> ${task.category}</p>
  <p><span class="font-semibold">Created At:</span> ${task.createdAt}</p>
  <p><span class="font-semibold">Comments:</span> ${task.comments || 'None'}</p>
`;
card.appendChild(moreDetails);

  const taskcontainer = document.querySelector('.task-container');
  taskcontainer.appendChild(card)


  // hidden Logic for show more card
   card.querySelector('.toggleBtn').addEventListener('click', () => {
        const moreDetails = card.querySelector('.moreDetails');
        moreDetails.classList.toggle('hidden');
        const btn = card.querySelector('.toggleBtn');
        btn.textContent = moreDetails.classList.contains('hidden') ? 'Show More' : 'Show Less';
    });






}






