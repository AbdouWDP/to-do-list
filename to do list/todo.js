const add_task_btn = document.getElementById("add-task");
const tasks = document.getElementById("tasks");

let all_tasks = [];

function getItemsLocalStorage() {
  let tasksParse = JSON.parse(localStorage.getItem("tasks"));
  if (tasksParse === null) {
    all_taskstasks = [];
  } else {
    all_tasks = tasksParse;
  }
}
getItemsLocalStorage();

function LS() {
  localStorage.setItem("tasks", JSON.stringify(all_tasks));
}

function readTasks() {
  tasks.innerHTML = "";
  for (var i = 0; i < all_tasks.length; i++) {
    let content = `
			<div class="task shadow rounded d-flex justify-content-between align-items-center ${
        all_tasks[i].isDone ? "done" : ""
      }">
				<div class="task-name">
					<h5 id="task-name" class="text-light" onclick="showAllText(${i})">${
      all_tasks[i].name
    }</h5>
				</div>
				<div class="btns d-flex">
					<span class="rounded bg-primary text-light " onclick="updateTask(${i})"><i class="fa-solid fa-pen"></i></span>
          <span class="rounded ${
            all_tasks[i].isDone ? "bg-warning" : "bg-success"
          } text-light" onclick="taskIsDone(${i})"><i class="fa-solid ${
      all_tasks[i].isDone ? "fa-xmark" : "fa-check"
    }"></i></span>
					<span class="rounded bg-danger text-light" onclick="deleteTask(${i})"><i class="fa-solid fa-trash"></i></span>
				</div>
			</div>
		`;
    tasks.innerHTML += content;
  }
  LS();
}
add_task_btn.addEventListener("click", () => {
  let p = prompt("Add task: ");
  let task = {
    name: p,
    isDone: false,
  };
  all_tasks.push(task);
  readTasks();
  LS();
});

function updateTask(i) {
  let task = all_tasks[i];
  let p = prompt("Update task: " + task.name);
  if (p) {
    task.name = p;
    task.isDone = false;
    readTasks();
    LS();
  }
}
function deleteTask(i) {
  let task = all_tasks[i];
  let c = confirm("Are yo sure you want to delete this task ?");
  if (c) {
    all_tasks.splice(i, 1);
    LS();
    readTasks();
  }
}

function taskIsDone(i) {
  let task = all_tasks[i];
  if (task.isDone === false) {
    let c = confirm("You want to confirm this task ?");
    if (c) {
      task.isDone = true;
    }
  } else {
    let c = confirm("This task is confirmed, do you want to unconfirm it ?");
    if (c) {
      task.isDone = false;
    }
  }
  readTasks();
}
function showAllText(i) {
  let task = all_tasks[i];
  let text = document.querySelector(".card-text");
  let text_card = document.querySelector(".all-text");
  text_card.style.visibility = "visible";
  text.innerHTML = task.name;
}

function closeTextCard() {
  let text_card = document.querySelector(".all-text");
  text_card.style.visibility = "hidden";
}

readTasks();
