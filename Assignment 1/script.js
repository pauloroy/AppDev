document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", removeTask);

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn">X</button>`;
    taskList.appendChild(li);

    saveTask(taskText);
    taskInput.value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task} <button class="delete-btn">X</button>`;
        taskList.appendChild(li);
    });
}

function removeTask(e) {
    if (e.target.classList.contains("delete-btn")) {
        let taskItem = e.target.parentElement;
        taskItem.remove();
        deleteTask(taskItem.textContent.slice(0, -2));
    }
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
