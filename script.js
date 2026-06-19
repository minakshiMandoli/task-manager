
//selecting elements
const input = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskManagerContainer = document.querySelector(".task-manager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = confirmEl.querySelector(".confirmed");
const cancelledBtn = confirmEl.querySelector(".cancel");

let indexToBeDeleted = null
      const taskContainer = document.getElementById('task-container');

// load tasks from local storage when the page loads

const savedTasks=JSON.parse(localStorage.getItem("tasks")) || [];
console.log("savedTasks..", savedTasks);

//save task to local storage
function addTask(){
    localStorage.setItem("tasks",JSON.stringify(savedTasks));
}



function createTaskNode(task, index) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');
    let classVal = "pending";
    let textVal = "Pending"
    if (task.completed) {
      classVal = "completed";
      textVal = "Completed";
    }
    taskCard.classList.add(classVal);

    const taskText = document.createElement('p');
    taskText.innerText = task.text;

    const taskStatus = document.createElement('p');
    taskStatus.classList.add('status');
    taskStatus.innerText = textVal;

    const toggleButton = document.createElement('button');
    toggleButton.classList.add("button-box");
    const btnContentEl = document.createElement("span");
    btnContentEl.classList.add("green");
    btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
    toggleButton.appendChild(btnContentEl);
    toggleButton.addEventListener('click', () => {
      savedTasks[index].completed = !savedTasks[index].completed;
      addTask();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("button-box");
    const delBtnContentEl = document.createElement("span");
    delBtnContentEl.classList.add("red");
    delBtnContentEl.innerText = 'Delete';
    deleteButton.appendChild(delBtnContentEl);
    deleteButton.addEventListener('click', () => {
      indexToBeDeleted = index;
      confirmEl.style.display = "block";
      taskManagerContainer?.classList.add("overlay");
    });

    taskCard.append(taskText, taskStatus, toggleButton, deleteButton);
  taskContainer.appendChild(taskCard);
}
// render tasks to the DOM
function renderTasks(){

  taskContainer.innerHTML = '';

  savedTasks.forEach((task,index)=>{
        createTaskNode(task,index);
      
    });
  
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    // Push a new todo object
    savedTasks.push({ text: text, completed: false });
    input.value = '';
    renderTasks()
    addTask()

}

// add task event listener
addTaskBtn.addEventListener("click", addTodo);
function deleteTask(index) {
  savedTasks.splice(index, 1);
  addTask();
  renderTasks();
}

confirmedBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer?.classList.remove("overlay");
  if (indexToBeDeleted !== null) {
    deleteTask(indexToBeDeleted);
  }
  indexToBeDeleted = null;
});

cancelledBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer?.classList.remove("overlay");
  indexToBeDeleted = null;
});
renderTasks()