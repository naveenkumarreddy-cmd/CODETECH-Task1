const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter !== todo.status) {
    return '';
  }
  let checked = todo.status === "completed" ? "checked" : "";
  return `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span>${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)">
        <i class="fa fa-times"></i>
      </button>
    </li>
  `;
}

function showTodos() {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = '';
    emptyImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    emptyImage.style.display = 'none';
  }
}

function addTodo() {
  const todo = input.value.trim();
  if (!todo) {
    return;
  }
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    addTodo();
  }
});

addButton.addEventListener("click", addTodo);

function updateStatus(todo) {
  const index = todo.id;
  todosJson[index].status = todo.checked ? "completed" : "pending";
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

filters.forEach(function(el) {
  el.addEventListener("click", function() {
    filters.forEach(tag => tag.classList.remove('active'));
    if (filter === el.dataset.filter) {
      filter = '';
    } else {
      el.classList.add('active');
      filter = el.dataset.filter;
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});
