// Select elements
const taskinput = document.getElementById("taskinput");
const addBtn = document.getElementById("addBtn");
const tasklist = document.getElementById("tasklist");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskinput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);
  taskinput.value = "";
}

// Create Task Element
function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    removeTask(text);
  });

  li.appendChild(deleteBtn);
  tasklist.appendChild(li);
}

// Save Task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task);
  });
}

// Remove Task from localStorage
function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
