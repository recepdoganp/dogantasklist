//define UI variables
const form = document.getElementById('task-form');
const taskList = document.
querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// load all event listeners
loadEventListeners();

function loadEventListeners (){
  // DOM load event
  document.addEventListener('DOMContentLoaded',getTasks)
  //add task event
  form.addEventListener('submit',addTask);
  // remove task even
  taskList.addEventListener('click',removeTask)
  // clear task event
  clearBtn.addEventListener('click',clearTasks);
  //filter tasks event
  filter.addEventListener('keyup',filterTasks)
}

// getTasks function from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task=>{
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = `<i class='fa fa-remove'></i>`
    li.appendChild(link)
    //append link to li to ul
    taskList.appendChild(li)
  })
}

// add task
const re = /\S/;
function addTask(e){
  if (!re.test(taskInput.value)) {
    alert('Add a task!');
    taskInput.value='';
  } else{
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = `<i class='fa fa-remove'></i>`
    li.appendChild(link)
    //append link to li to ul
    taskList.appendChild(li)

    //stoer in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value='';
  }
  e.preventDefault()
}


// store task function
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


// remove task

function removeTask (e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    return;
  }
}

//remove from local storage

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  tasks.forEach((task,index)=>{
    if(taskItem.textContent === task){
      tasks.splice(index,1)
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e){

  if(confirm('Are you sure to delete all tasks?')){
    //taskList.innerHTML = '';
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }
  //clear from local storage
  clearTasksFromLocalStorage();
  }
  
}

// clear tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// filters tasks

function filterTasks(e){
  const text = e.target.value;
  const re = new RegExp(text,'i');
  document.querySelectorAll('.collection-item').forEach(task=>{
    const item = task.firstChild.textContent;
    if (re.test(item)){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
  history.pushState({
    id: 'homepage'
  }, 'Dogan Task List', 'index.html');

}