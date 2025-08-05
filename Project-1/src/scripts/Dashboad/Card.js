
 export function addtaskcard(task){
  const card =document.createElement('div');
  card.className="taskcard bg-white shadow-lg flex flex-col justify-between mx-5 my-3 p-5 rounded-lg w-72 border border-gray-200"

  card.innerHTML=`<!-- Title -->
  <h1 class="text-xl font-bold text-gray-800 mb-2">${task.taskTitle}</h1>

  <!-- Minimal Details -->
  <div class="text-sm text-gray-600 space-y-1">
    <p><span class="font-semibold">Priority:</span> ${task.taskPriority}</p>
    <p><span class="font-semibold">Status:</span>${task.taskStatus}</p>
    <p><span class="font-semibold">Date:</span> ${task.taskDueDate}</p>
  </div>

  <!-- More Details (Hidden by default) -->
  <div class="moreDetails text-sm text-gray-600 space-y-1 mt-2 hidden">
    <p><span class="font-semibold">Time:</span> 14:30</p>
    <p><span class="font-semibold">Category:</span>${task.category}</p>
    <p><span class="font-semibold">Created At:</span> ${task.createdAt}</p>
    <p><span class="font-semibold">Updated At:</span> 2025-07-04</p>
    <p><span class="font-semibold">Comments:</span> ${task.comments || 'None'}</p>
    <p><span class="font-semibold">Attachments:</span> File1.pdf</p>
  </div>

  <!-- Buttons -->
  <div class="flex justify-between mt-4">
    <button class="toggleBtn bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">Show More</button>
    <div class="space-x-2">
      <button class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition duration-200">Edit</button>
      <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">Delete</button>
    </div>
  </div>`

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






