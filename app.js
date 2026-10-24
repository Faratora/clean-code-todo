const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createTaskElement = function (tag, properties) {
  const element = document.createElement(tag);
  Object.assign(element, properties);
  return element;
};

const createNewTaskElement = function (taskString) {
  const checkBox = createTaskElement('input', { type: 'checkbox' });
  const label = createTaskElement('label', { className: 'task', innerText: taskString });
  const editInput = createTaskElement('input', { type: 'text', className: 'task' });
  const editButton = createTaskElement('button', { className: 'edit', innerText: 'Edit' });
  const deleteButton = createTaskElement('button', { className: 'delete' });
  deleteButton.appendChild(createTaskElement('img', { src: './remove.svg' }));

  const listItem = document.createElement('li');
  [checkBox, label, editInput, editButton, deleteButton].forEach(function (element) {
    listItem.appendChild(element);
  });
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  moveTask(listItem, incompleteTaskHolder, moveTaskToCompleted);

  taskInput.value = '';
};

const editTask = function (listItem) {
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function (listItem) {
  listItem.parentNode.removeChild(listItem);
};

const moveTask = function (listItem, targetHolder, nextHandler) {
  targetHolder.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
};

const moveTaskToCompleted = function (listItem) {
  moveTask(listItem, completedTasksHolder, moveTaskToIncompleted);
};

const moveTaskToIncompleted = function (listItem) {
  moveTask(listItem, incompleteTaskHolder, moveTaskToCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = function () {
    editTask(taskListItem);
  };

  deleteButton.onclick = function () {
    deleteTask(taskListItem);
  };

  checkBox.onchange = function () {
    checkBoxEventHandler(taskListItem);
  };
};

const bindAllTasks = function (taskList, checkBoxEventHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], checkBoxEventHandler);
  }
};

bindAllTasks(incompleteTaskHolder, moveTaskToCompleted);
bindAllTasks(completedTasksHolder, moveTaskToIncompleted);
