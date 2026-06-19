
//selecting elements
const input = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// load tasks from local storage when the page loads

const savedTasks=JSON.parse(localStorage.getItem("tasks")) || [];
console.log("savedTasks..", savedTasks);

//save task to local storage
function addTask(){
    localStorage.setItem("tasks",JSON.stringify(savedTasks));
}

//create a new task and add it to the list
function createTaskNode(task, index){
    const li=document.createElement("li");

         const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        addTask();
    })

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.style.margin = '0 8px';
    if (task.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    // Add double-click event listener to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", task.text);
        if (newText !== null) {
            task.text = newText.trim()
            textSpan.textContent = task.text;
            addTask();
        }
    })

    // Delete Todo Button 
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        savedTasks.splice(index, 1);
        renderTasks();
        addTask();
    })

    li.append(checkbox, textSpan, delBtn);
    return li
    
}

// render tasks to the DOM
function renderTasks(){
    taskList.innerHTML="";

    console.log("savedTasks.. inside render", savedTasks);    
    savedTasks.forEach((task,index)=>{
        const node= createTaskNode(task,index);
        taskList.appendChild(node);
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
renderTasks()