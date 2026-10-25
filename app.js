const taskInput = document.getElementById('todo__new-task');
const addButton = document.querySelector('.todo__button--add');
const incompleteTaskHolder = document.getElementById('todo__incomplete');
const completedTasksHolder = document.getElementById('todo__completed');

const TASK_CLASS = {
  ITEM: 'todo__item',
  ITEM_COMPLETED: 'todo__item--completed',
  ITEM_EDITING: 'todo__item--editing',
  LABEL: 'todo__label',
  INPUT: 'todo__input',
  BUTTON: 'todo__button',
  EDIT_BUTTON: 'todo__button--edit',
  DELETE_BUTTON: 'todo__button--delete',
  DELETE_ICON: 'todo__delete-icon',
};

const createTaskElement = function (tag, properties) {
  const element = document.createElement(tag);
  Object.assign(element, properties);
  return element;
};

const createNewTaskElement = function (taskString) {
  const checkBox = createTaskElement('input', { type: 'checkbox' });

  const label = createTaskElement('label', {
    className: TASK_CLASS.LABEL,
    innerText: taskString,
  });

  const editInput = createTaskElement('input', {
    type: 'text',
    className: TASK_CLASS.INPUT,
  });

  const editButton = createTaskElement('button', {
    className: `${TASK_CLASS.BUTTON} ${TASK_CLASS.EDIT_BUTTON}`,
    innerText: 'Edit',
  });

  const deleteButton = createTaskElement('button', {
    className: `${TASK_CLASS.BUTTON} ${TASK_CLASS.DELETE_BUTTON}`,
  });

  deleteButton.appendChild(
    createTaskElement('img', {
      className: TASK_CLASS.DELETE_ICON,
      src: './remove.svg',
    }),
  );

  const listItem = createTaskElement('li', {
    className: TASK_CLASS.ITEM,
  });

  [checkBox, label, editInput, editButton, deleteButton].forEach(function (element) {
    listItem.appendChild(element);
  });

  return listItem;
};

const addTask = function () {
  const trimmedValue = taskInput.value.trim();
  if (!trimmedValue) return;

  const listItem = createNewTaskElement(trimmedValue);

  bindTaskEvents(listItem);
  moveTask(listItem, incompleteTaskHolder);

  taskInput.value = '';
};

const editTask = function (listItem) {
  const editInput = listItem.querySelector(`input[type="text"].${TASK_CLASS.INPUT}`);
  const label = listItem.querySelector(`label.${TASK_CLASS.LABEL}`);
  const editBtn = listItem.querySelector(`.${TASK_CLASS.EDIT_BUTTON}`);
  const isEditMode = listItem.classList.contains(TASK_CLASS.ITEM_EDITING);

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle(TASK_CLASS.ITEM_EDITING);
};

const deleteTask = function (listItem) {
  listItem.parentNode.removeChild(listItem);
};

const moveTask = function (listItem, targetHolder) {
  targetHolder.appendChild(listItem);
};

const toggleTaskState = function (listItem) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const isCompleted = checkBox.checked;
  const targetHolder = isCompleted ? completedTasksHolder : incompleteTaskHolder;

  listItem.classList.toggle(TASK_CLASS.ITEM_COMPLETED, isCompleted);
  moveTask(listItem, targetHolder);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector(`.${TASK_CLASS.EDIT_BUTTON}`);
  const deleteButton = taskListItem.querySelector(`.${TASK_CLASS.DELETE_BUTTON}`);

  editButton.addEventListener('click', function () {
    editTask(taskListItem);
  });

  deleteButton.addEventListener('click', function () {
    deleteTask(taskListItem);
  });

  checkBox.addEventListener('change', function () {
    toggleTaskState(taskListItem);
  });
};

const bindAllTasks = function (taskList) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i]);
  }
};

bindAllTasks(incompleteTaskHolder);
bindAllTasks(completedTasksHolder);
