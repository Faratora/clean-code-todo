const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const TASK_CLASS = {
  LABEL: 'task',
  EDIT: 'edit',
  DELETE: 'delete',
  EDIT_MODE: 'editMode',
};

const createTaskElement = function (tag, properties) {
  const element = document.createElement(tag);
  Object.assign(element, properties);
  return element;
};

const createNewTaskElement = function (taskString) {
  const checkBox = createTaskElement('input', { type: 'checkbox' });
  const label = createTaskElement('label', { className: TASK_CLASS.LABEL, innerText: taskString });
  const editInput = createTaskElement('input', { type: 'text', className: TASK_CLASS.LABEL });
  const editButton = createTaskElement('button', {
    className: TASK_CLASS.EDIT,
    innerText: 'Edit',
  });
  const deleteButton = createTaskElement('button', { className: TASK_CLASS.DELETE });
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
  const editBtn = listItem.querySelector(`.${TASK_CLASS.EDIT}`);
  const isEditMode = listItem.classList.contains(TASK_CLASS.EDIT_MODE);

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle(TASK_CLASS.EDIT_MODE);
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
  const editButton = taskListItem.querySelector(`button.${TASK_CLASS.EDIT}`);
  const deleteButton = taskListItem.querySelector(`button.${TASK_CLASS.DELETE}`);

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
