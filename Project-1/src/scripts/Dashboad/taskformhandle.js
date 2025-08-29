import { auth } from "../firebase";
import { addtask, addtaskcard } from "./Card";


export function taskfromhandling(){
  console.log("form handlind started")
  const addtaskBtn = document.getElementById('addtaskBtn')
  const Parentcontainer = document.querySelector('.task-container');
  


  let taskform = null;


  const overlay = document.createElement('div')
  overlay.className = 'absolute  inset-0 bg-black bg-opacity-30 backdrop-blur-sm hidden flex  justify-center items-center z-40'; 
  document.body.append(overlay);
  






function openForm() {
    if (!taskform) {
      taskform = createtaskform(closeForm);
      overlay.append(taskform);
      overlay.classList.remove('hidden');
      addtaskBtn.textContent = 'Close';
    }
  }

  function closeForm() {
    if (taskform) {
      overlay.classList.add('hidden');
      overlay.removeChild(taskform);
      taskform = null;
      addtaskBtn.textContent = '+ Add Task';
    }
  }

  addtaskBtn.addEventListener('click', () => {
    if (!taskform) openForm();
    else closeForm();
  });


}





function createtaskform(closeForm){
    const formcontainer = document.createElement('div');
    formcontainer.className='flex  px-5  max-w-md mx-auto w-full  border-2 border-gray-300 shadow-lg rounded-lg items-center justify-center z-50 '
    formcontainer.innerHTML=`
    <form id ="taskForm" class="w-full my-4  ">
            <div class="mb-2">
              <label for="taskTitle" class="block  text-sm font-bold text-[#1da1f2]">Task Title</label>
              <input type="text" id="taskTitle"  name="taskTitle" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm" placeholder="Enter task title" required>
            </div>
            <div class="mb-2">
              <label for="taskDescription" class="block text-sm font-medium text-[#1da1f2]">Task Description</label>
              <textarea id="taskDescription" name="taskDescription" rows="2" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm" placeholder="Enter task description" required></textarea></div>
            <div class="mb-2">
              <label for="taskDueDate" class="block text-sm font-medium text-[#1da1f2]">Due Date</label>
              <input type="date" id="taskDueDate" name="taskDueDate" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm" required>
            </div>
            <div class="mb-2">
              <label for="taskPriority" class="block text-sm font-medium text-[#1da1f2]">Priority</label>
              <select id="taskPriority"  name="taskPriority" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div  class="mb-2">
              <label for ="category" class="block text-sm font-medium text-[#1da1f2]">Category</label>
              <select id="category" name="category" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm">
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select> 
            </div>

            <div class=" mb-2">
              <label for="comments" class="block text>-sm font-medium text-[#1da1f2]">Comments</label>
              <textarea id="comments" name="comments" rows="" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1da1f2] focus:border-[#1da1f2] sm:text-sm" placeholder="Add any comments or notes"></textarea>
              
            </div>
            <div class="flex justify-end">
              <button type="submit" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">Add Task</button>  

            </div>
          </form>`;

        formcontainer.querySelector('#taskForm').addEventListener('submit', async(e) => {
        e.preventDefault(); // Prevent page reload

        const user = auth.currentUser;
        if(!user){
          alert("Please login to add a task.");
          return;
        }


        const formData = new FormData(e.target);
        const taskDetails = Object.fromEntries(formData.entries());
       
        console.log('Task Details:', taskDetails);

        try{
          const taskRef = await addtask(taskDetails,user.uid);

          console.log('Task added successfully to the firebase', taskRef);
         
          closeForm(); // Add the task card to the UI          

        }catch(error){
          console.error("Error adding task:", error);
          alert("Failed to add task. Please try again.");
        }

       
        
        

    });

    return formcontainer;
}