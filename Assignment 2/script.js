var TaskManager = /** @class */ (function () {
    function TaskManager() {
        var _this = this;
        this.tasks = [];
        this.taskList = document.getElementById("taskList");
        this.taskInput = document.getElementById("taskInput");
        this.filterInput = document.getElementById("filterInput");
        this.addTaskBtn = document.getElementById("addTaskBtn");
        this.loadTasks();
        this.addTaskBtn.addEventListener("click", function () { return _this.addTask(); });
        this.filterInput.addEventListener("input", function () { return _this.filterTasks(); });
    }
    TaskManager.prototype.loadTasks = function () {
        var storedTasks = localStorage.getItem("tasks");
        this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
        this.renderTasks();
    };
    TaskManager.prototype.saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };
    TaskManager.prototype.addTask = function () {
        var content = this.taskInput.value.trim();
        if (content) {
            var newTask = { id: Date.now(), content: content };
            this.tasks.push(newTask);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = "";
        }
    };
    TaskManager.prototype.renderTasks = function () {
        var _this = this;
        this.taskList.innerHTML = "";
        this.tasks.forEach(function (task) {
            var li = document.createElement("li");
            li.textContent = task.content;
            _this.taskList.appendChild(li);
        });
    };
    TaskManager.prototype.filterTasks = function () {
        var _this = this;
        var keyword = this.filterInput.value.toLowerCase();
        this.taskList.innerHTML = "";
        this.tasks.filter(function (task) { return task.content.toLowerCase().includes(keyword); })
            .forEach(function (task) {
            var li = document.createElement("li");
            li.textContent = task.content;
            _this.taskList.appendChild(li);
        });
    };
    return TaskManager;
}());
document.addEventListener("DOMContentLoaded", function () { return new TaskManager(); });
