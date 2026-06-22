const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

let todos =
    JSON.parse(localStorage.getItem("todos")) || [];

function saveData() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo) => {

        const li = document.createElement("li");

        li.className = "todo-item";

        li.innerHTML = `
            <span>${todo.text}</span>

            <div class="actions">
                <button
                    class="edit-btn"
                    onclick="editTodo(${todo.id})"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTodo(${todo.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        todoList.appendChild(li);
    });

    taskCount.innerText =
        `You have ${todos.length} pending tasks`;
}

addBtn.addEventListener("click", () => {

    const value = todoInput.value.trim();

    if (value === "") {
        alert("Vui lòng nhập công việc");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: value
    };

    todos.push(newTodo);

    saveData();
    renderTodos();

    todoInput.value = "";
});

function deleteTodo(id) {

    todos = todos.filter(
        (todo) => todo.id !== id
    );

    saveData();
    renderTodos();
}

function editTodo(id) {

    const todo = todos.find(
        (item) => item.id === id
    );

    const newText = prompt(
        "Nhập nội dung mới",
        todo.text
    );

    if (
        newText === null ||
        newText.trim() === ""
    ) {
        return;
    }

    todo.text = newText.trim();

    saveData();
    renderTodos();
}

clearBtn.addEventListener("click", () => {

    if (
        confirm(
            "Bạn có chắc muốn xóa tất cả?"
        )
    ) {
        todos = [];

        saveData();
        renderTodos();
    }
});

renderTodos();