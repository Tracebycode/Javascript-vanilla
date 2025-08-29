import {db} from '../firebase.js';
import { doc,collection, addDoc, orderBy, onSnapshot, query,serverTimestamp ,deleteDoc} from 'firebase/firestore';
import { auth } from "../firebase.js"; // make sure you import this






// Handling add task after from submission
export async function addtask(taskDetails,userId){
  try{
     const taskcollectionRef =collection(db,`users/${userId}/tasks`)
     const docRef = await addDoc(taskcollectionRef,{
        ...taskDetails,
            createdAt: serverTimestamp() 
})

          return { id: docRef.id, ...taskDetails };

  }catch(error){
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }

}
 
 
 
export function addtaskcard(task) {
  // Input validation
  if (!task || !task.id || !task.taskTitle) {
    console.error('Invalid task object provided');
    return null;
  }

  const card = document.createElement('div');
  card.className = "taskcard bg-white shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col mx-4 my-2 px-4 py-3 rounded-lg border border-gray-200 w-7/8";
  card.id = task.id;

  // Helper function to get priority styling
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600', 
      low: 'text-green-600'
    };
    return colors[priority?.toLowerCase()] || 'text-gray-600';
  };

  // Helper function to format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  // Build main card layout
  card.innerHTML = `
    <div class="flex justify-between items-start">
      <div class="flex items-start gap-3 flex-1">
        <input type="checkbox" class="completeCheckbox w-4 h-4 mt-1 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500" ${task.taskStatus === "completed" ? "checked" : ""}>
        <div class="flex-1">
          <h2 class="text-base font-semibold text-gray-800 ${task.taskStatus === "completed" ? "line-through text-gray-500" : ""}">${task.taskTitle}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-sm text-gray-500">${formatDate(task.taskDueDate)}</span>
            <span class="text-xs px-2 py-1 rounded-full bg-gray-100 ${getPriorityColor(task.taskPriority)}">${task.taskPriority || 'No priority'}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 ml-4">
        <button class="toggleBtn text-blue-600 hover:text-blue-800 hover:underline text-sm px-2 py-1 rounded transition-colors">Details</button>
        <button class="editBtn text-yellow-600 hover:text-yellow-700 text-sm px-2 py-1 rounded transition-colors">Edit</button>
        <button class="deleteBtn text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded transition-colors">Delete</button>
      </div>
    </div>
  `;

  // Add the expandable details section
  const moreDetails = document.createElement('div');
  moreDetails.className = "moreDetails hidden mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 space-y-2";
  moreDetails.innerHTML = `
    <div class="grid grid-cols-2 gap-4">
      <p><span class="font-semibold">Category:</span> ${task.category || 'Uncategorized'}</p>
      <p><span class="font-semibold">Created:</span> ${formatDate(task.createdAt)}</p>
    </div>
    ${task.comments ? `<div><span class="font-semibold">Comments:</span><div class="mt-1 p-2 bg-gray-50 rounded text-gray-700">${task.comments}</div></div>` : ''}
  `;
  card.appendChild(moreDetails);

  // Add to container
  const taskcontainer = document.querySelector('.task-container');
  if (!taskcontainer) {
    console.error('Task container not found');
    return null;
  }
  taskcontainer.appendChild(card);

  // Enhanced toggle details functionality
  const toggleBtn = card.querySelector('.toggleBtn');
  toggleBtn.addEventListener('click', () => {
    const moreDetails = card.querySelector('.moreDetails');
    const isHidden = moreDetails.classList.contains('hidden');
    
    moreDetails.classList.toggle('hidden');
    toggleBtn.textContent = isHidden ? 'Hide' : 'Details';
    
    // Smooth transition effect
    if (!isHidden) {
      moreDetails.style.maxHeight = '0px';
      moreDetails.style.overflow = 'hidden';
      moreDetails.style.transition = 'max-height 0.3s ease-out';
    } else {
      moreDetails.style.maxHeight = moreDetails.scrollHeight + 'px';
      setTimeout(() => {
        moreDetails.style.maxHeight = 'none';
      }, 300);
    }
  });

  // Enhanced checkbox functionality
  const checkbox = card.querySelector('.completeCheckbox');
  const taskTitle = card.querySelector('h2');
  
  checkbox.addEventListener('change', async () => {
    const isCompleted = checkbox.checked;
    
    // Update UI immediately
    if (isCompleted) {
      taskTitle.classList.add('line-through', 'text-gray-500');
      card.classList.add('opacity-75');
    } else {
      taskTitle.classList.remove('line-through', 'text-gray-500');
      card.classList.remove('opacity-75');
    }

    try {
      // Update task status in your backend
      // await updateTaskStatus(task.id, isCompleted ? 'completed' : 'pending');
      console.log(`Task ${task.id} status updated to ${isCompleted ? 'completed' : 'pending'}`);
    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert changes on error
      checkbox.checked = !isCompleted;
      if (isCompleted) {
        taskTitle.classList.remove('line-through', 'text-gray-500');
        card.classList.remove('opacity-75');
      } else {
        taskTitle.classList.add('line-through', 'text-gray-500');
        card.classList.add('opacity-75');
      }
    }
  });

  // Enhanced delete functionality
  card.querySelector('.deleteBtn').addEventListener('click', async () => {
    // Confirmation dialog
    const confirmed = confirm(`Are you sure you want to delete "${task.taskTitle}"?`);
    if (!confirmed) return;

    const currentuser = auth.currentUser;
    if (!currentuser) {
      alert("Please Login to delete the task");
      return;
    }

    // Add loading state
    const deleteBtn = card.querySelector('.deleteBtn');
    const originalText = deleteBtn.textContent;
    deleteBtn.textContent = 'Deleting...';
    deleteBtn.disabled = true;

    try {
      await deleteTask(auth.currentUser.uid, card.id);
      console.log("Task deleted successfully");
      
      // Smooth removal animation
      card.style.transform = 'translateX(100%)';
      card.style.opacity = '0';
      card.style.transition = 'all 0.3s ease-out';
      
      setTimeout(() => {
        card.remove();
      }, 300);
      
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
      
      // Reset button state
      deleteBtn.textContent = originalText;
      deleteBtn.disabled = false;
    }
  });

  // Edit button functionality (placeholder)
  card.querySelector('.editBtn').addEventListener('click', () => {
    console.log('Edit task:', task.id);
    // Add your edit functionality here
    // Example: openEditModal(task);
  });

  // Add entrance animation
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  return card;
}


// Listen to real-time updates for tasks


export function listentoTask(userId){
  const taskcollectionRef = collection(db,`users/${userId}/tasks`);
  const q = query(taskcollectionRef, orderBy('createdAt', 'desc'));
  onSnapshot(q,(snapshot)=>{
    const taskcontainer =document.querySelector('.task-container');
    taskcontainer.innerHTML = '';  
    snapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id; 
      addtaskcard(task);
    });
  })    
}



//handling completed task




// Handling completed task







// Deleting the task

export async function deleteTask(userId,taskId){
  try{
    const taskDocRef=doc(db,`users/${userId}/tasks`,taskId);
    await deleteDoc(taskDocRef);  
    console.log("Task deleted successfully");

  }catch(error){
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
}



