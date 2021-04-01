const $textarea = document.getElementById('todo-input');
const $saveBtn = document.getElementById('save-btn');
const $clearBtn = document.getElementById('clear-all-btn');
const $todoList = document.getElementById('todo-list');
const $doneList = document.getElementById('done-list');
const $todoCount = document.getElementById('todo-count');
const $doneCount = document.getElementById('done-count');

function updateTodoCount() {
  $todoCount.textContent = $todoList.childElementCount;
}

function updateDoneCount() {
  $doneCount.textContent = $doneList.childElementCount;
}

function printTodoItem(todoText) {
  const template = `<div class="box">
      <p>${todoText}</p>
      <a class="done-btn fas fa-check-circle fa-2x"></a>
    </div>`;

  $todoList.insertAdjacentHTML('beforeend', template);
  updateTodoCount();
}

function printDoneItem(doneText) {
  const template = `<div class="box">
      <p>${doneText}</p>
      <a class="remove-btn fas fa-times-circle fa-2x"></a>
    </div>`;

  $doneList.insertAdjacentHTML('beforeend', template);
  updateDoneCount();
}

function saveBtnClick() {
  const todoText = $textarea.value;
  printTodoItem(todoText);
  $textarea.value = '';
}

function clearAllBtnClick() {
  $todoList.innerHTML = '';
  updateTodoCount();
  $doneList.innerHTML = '';
  updateDoneCount();
}

function todoItemDone($btn) {
  const $box = $btn.closest('.box');
  $btn.className = 'remove-btn fas fa-times-circle fa-2x';
  $doneList.insertAdjacentElement('beforeend', $box);

  updateDoneCount();
  updateTodoCount();
}

function todoListClick(event) {
  const $target = event.target;

  if ($target.matches('.done-btn')) {
    todoItemDone($target);
  }

  if ($target.matches('.box') || $target.matches('.box p')) {
    const $box = $target.closest('.box');
    if ($box.classList.contains('active')) {
      $box.classList.remove('active');
    } else {
      const $activeTodoItems = $todoList.querySelectorAll('.active');
      for (let i = 0; i < $activeTodoItems.length; i++) {
        $activeTodoItems[i].classList.remove('active');
      }

      $box.classList.add('active');
    }
  }
}

function doneListClick(event) {
  const $target = event.target;

  if ($target.matches('.remove-btn')) {
    const $box = $target.closest('.box');
    $box.remove();
    updateDoneCount();
  }
}

clearAllBtnClick();

$saveBtn.addEventListener('click', saveBtnClick);
$clearBtn.addEventListener('click', clearAllBtnClick);
$todoList.addEventListener('click', todoListClick);
$doneList.addEventListener('click', doneListClick);
