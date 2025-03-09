interface Task {
    id: number;
    content: string;
}

class TaskManager {
    private tasks: Task[] = [];
    private taskList = document.getElementById("taskList") as HTMLUListElement;
    private taskInput = document.getElementById("taskInput") as HTMLInputElement;
    private filterInput = document.getElementById("filterInput") as HTMLInputElement;
    private addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;

    constructor() {
        this.loadTasks();
        this.addTaskBtn.addEventListener("click", () => this.addTask());
        this.filterInput.addEventListener("input", () => this.filterTasks());
    }

    private loadTasks(): void {
        const storedTasks = localStorage.getItem("tasks");
        this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
        this.renderTasks();
    }

    private saveTasks(): void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    private addTask(): void {
        const content = this.taskInput.value.trim();
        if (content) {
            const newTask: Task = { id: Date.now(), content };
            this.tasks.push(newTask);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = "";
        }
    }

    private renderTasks(): void {
        this.taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.content;
            this.taskList.appendChild(li);
        });
    }

    private filterTasks(): void {
        const keyword = this.filterInput.value.toLowerCase();
        this.taskList.innerHTML = "";
        this.tasks.filter(task => task.content.toLowerCase().includes(keyword))
            .forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.content;
                this.taskList.appendChild(li);
            });
    }
}

document.addEventListener("DOMContentLoaded", () => new TaskManager());
