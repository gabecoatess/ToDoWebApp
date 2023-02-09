/*

  Beware, this is probably the worst piece of code I have ever made.
  That goes for the WHOLE project, it was done in an afternoon and
  focused on the design and basic functionality.

  Created by Gabriel Coates, 2023

*/

const addButton = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("todo-container");

const taskNameInput = document.getElementById("task-name-input");
const taskPriorityInput = document.getElementById("task-priority-input");

let taskName;
let taskPriority;

let taskCount = 0;

function SetExistingTasks(taskPriority, taskName) {
  taskCount = taskCount + 1;
  let taskClass;

  console.log(taskCount);

  if (taskPriority === "LOW") {
    taskClass = "low-pri";
  } else if (taskPriority === "MED") {
    taskClass = "med-pri";
  } else if (taskPriority === "HIGH") {
    taskClass = "high-pri";
  } else {
    taskClass = "crit-pri";
  }

  let html = `<div id="${taskCount}-obj" class="todo-object"><a class="todo-priority ${taskClass}">${taskPriority}</a><h3 class="todo-title">${taskName}</h3><button onclick="RemoveTask(${taskCount}, '${taskName}', '${taskPriority}')" id="finished-button-${taskCount}" class="stylized-button todo-button">Finish</button></div>`;

  taskContainer.innerHTML += html;
}

function CreateTask() {
  let taskClass;

  taskName = taskNameInput.value;
  taskPriority = taskPriorityInput.value;

  if (taskPriority === "LOW") {
    taskClass = "low-pri";
  } else if (taskPriority === "MED") {
    taskClass = "med-pri";
  } else if (taskPriority === "HIGH") {
    taskClass = "high-pri";
  } else {
    taskClass = "crit-pri";
  }

  taskCount = taskCount + 1;

  let html = `<div id="${taskCount}-obj" class="todo-object"><a class="todo-priority ${taskClass}">${taskPriority}</a><h3 class="todo-title">${taskName}</h3><button onclick="RemoveTask(${taskCount}, '${taskName}', '${taskPriority}')" id="finished-button-${taskCount}" class="stylized-button todo-button">Finish</button></div>`;

  taskContainer.innerHTML += html;

  let data = localStorage.getItem("userData");
  let userData = JSON.parse(data);

  userData["tasks"].push({
    id: userData["tasks"].length + 1,
    name: taskName,
    priority: taskPriority,
  });

  localStorage.setItem("userData", JSON.stringify(userData));

  taskNameInput.value = null;

  taskName = null;
  taskPriority = null;
}

function ReadCookies() {
  if (localStorage.getItem("userData") === null) {
    // Create an object
    const userData = {
      tasks: [],
    };
    // Store the object into storage
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    const data = localStorage.getItem("userData");
    const userData = JSON.parse(data);

    for (let i = 0; i < userData.tasks.length; i++) {
      taskName = userData.tasks[i].name;
      taskPriority = userData.tasks[i].priority;

      SetExistingTasks(taskPriority, taskName);
    }
  }
}

addButton.addEventListener("click", CreateTask);

ReadCookies();
