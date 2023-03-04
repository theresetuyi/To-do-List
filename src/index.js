import './style.css';
import updateTodos from './modules/interactive.js';

const newTodoForm = document.querySelector('#new-todo-form');
const todoList = document.querySelector('.todo-list');
const clear = document.querySelector('.clearComplete');

function updateInputText(id, newText) {
  const todoListArray = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateTodoList = todoListArray.map((todo) => {
    if (todo.id === parseInt(id, 10)) {
      return { ...todo, description: newText };
    }
    return todo;
  });

  updateTodos(updateTodoList);
}

function toggleComplete(id) {
  const todoListArray = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateTodoList = todoListArray.map((todo) => {
    if (todo.id === parseInt(id, 10)) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  updateTodos(updateTodoList);
}

const removeCompleted = () => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateList = todoListArr.filter((todo) => todo.completed !== true);
  updateTodos(updateList);
};

const removeTodo = (targetIndex) => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateList = todoListArr.filter((todo) => todo.id !== parseInt(targetIndex, 10));
  updateTodos(updateList);
};

function updateList(todos) {
  const description = todos.map((todo) => `
            <li class="card todo-list-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
              <input type="checkbox" ${todo.completed ? 'checked' : ''} class="checkbox"/>
              <input type="text" value="${todo.description}" class="inputtext" id="${todo.id}"/>
              <button type="button">🗑</button>
            </li>
          `).join('');

  todoList.innerHTML = description;
  const inputTexts = todoList.querySelectorAll('.todo-list-item input[type=text]');

  inputTexts.forEach((input) => input.addEventListener('change', (e) => updateInputText(input.id, e.target.value)));

  const deleteButtons = todoList.querySelectorAll('.todo-list-item button');

  deleteButtons.forEach((button) => button.addEventListener('click', () => removeTodo(button.parentNode.getAttribute('data-id'))));

  const completedCheckboxes = todoList.querySelectorAll('.checkbox');
  completedCheckboxes.forEach((checkbox) => checkbox.addEventListener('click', () => toggleComplete(checkbox.parentNode.getAttribute('data-id'))));
}

function newTodo(e) {
  e.preventDefault();
  const newTask = document.getElementById('new-task').value;
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');

  const newTodo = {
    description: newTask,
    completed: false,
    id: todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : todos.length + 1,
  };

  document.getElementById('new-task').value = '';
  const updatedTodos = [...todos, newTodo];
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  updateList(updatedTodos);
}

function init() {
  newTodoForm.addEventListener('submit', newTodo);
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  updateList(todos);
}

clear.addEventListener('click', () => {
  removeCompleted();
});

init();