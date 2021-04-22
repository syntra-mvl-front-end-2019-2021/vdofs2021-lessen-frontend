const $textarea = document.getElementById('todo-input');
const $saveBtn = document.getElementById('save-btn');
const $clearBtn = document.getElementById('clear-all-btn');
const $todoList = document.getElementById('todo-list');
const $doneList = document.getElementById('done-list');
const $todoCount = document.getElementById('todo-count');
const $doneCount = document.getElementById('done-count');
const $todoPagination = document.getElementById('todo-pagination');
const $donePagination = document.getElementById('done-pagination');

const limit = 5;
let todoPage = 1;
let todoPageCount = 0;
let todoCount = 0;
let donePage = 1;
let donePageCount = 0;
let doneCount = 0;

function updateTodoCount() {
    $todoCount.textContent = todoCount;
}

function updateDoneCount() {
    $doneCount.textContent = doneCount;
}

function printTodoItem(todoItem) {
    const template = `<div class="box">
      <p>${todoItem.description}</p>
      <a data-id="${todoItem.id}" class="done-btn fas fa-check-circle fa-2x"></a>
    </div>`;

    $todoList.insertAdjacentHTML('beforeend', template);
}

function printDoneItem(doneItem) {
    const template = `<div class="box">
      <p>${doneItem.description}</p>
      <a data-id="${doneItem.id}" class="remove-btn fas fa-times-circle fa-2x"></a>
    </div>`;

    $doneList.insertAdjacentHTML('beforeend', template);
}

function saveBtnClick() {
    if (!$textarea.value) {
        return;
    }

    $saveBtn.disabled = true;

    const body = {
        description: $textarea.value,
        done: false,
    };

    fetch('https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ABcEHA2kcrKY4a6ipUA3',
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not save todo item');
            }

            return response.json();
        })
        .then((body) => {
            todoPage = 1;
            fetchAllItems(false);

            $saveBtn.disabled = false;
        })
        .catch((err) => {
            console.error(err);
            $saveBtn.disabled = false;
        });

    $textarea.value = '';
}

function clearAllBtnClick() {
    // $todoList.innerHTML = '';
    // updateTodoCount();
    // $doneList.innerHTML = '';
    // updateDoneCount();
}

function todoItemDone($btn) {
    const id = $btn.dataset.id;
    const $box = $btn.closest('.box');
    $box.remove();

    fetch(
        'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo/' + id,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ABcEHA2kcrKY4a6ipUA3',
            },
            body: '{"done":true}',
        },
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not update todo item');
            }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            if (todoPage === todoPageCount && todoCount % limit === 1) {
                todoPage--;
            }

            fetchAllItems(false);
            fetchAllItems(true);
        });
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
        const id = $target.dataset.id;
        $doneList.classList.add('loading');

        fetch(
            'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo/' +
                id,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ABcEHA2kcrKY4a6ipUA3',
                },
            },
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('could not remove item');
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                if (donePage === donePageCount && doneCount % limit === 1) {
                    donePage--;
                }

                fetchAllItems(true);
            });
    }
}

function printPagination(done) {
    let pageCount = todoPageCount;
    let curPage = todoPage;

    if (done) {
        pageCount = donePageCount;
        curPage = donePage;
    }

    let template = `<nav class="pagination" role="navigation" aria-label="pagination">
          <ul class="pagination-list">`;

    for (let i = 1; i <= pageCount; i++) {
        template += `<li>
              <a class="pagination-link ${
                  i === curPage ? 'is-current' : ''
              }" aria-label="Page ${i}" aria-current="page">${i}</a>
            </li>`;
    }

    template += `</ul></nav>`;

    if (done) {
        $donePagination.innerHTML = template;
    } else {
        $todoPagination.innerHTML = template;
    }
}

function fetchAllItems(done = false) {
    if (done) {
        $doneList.classList.add('loading');
    } else {
        $todoList.classList.add('loading');
    }

    fetch(
        `https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo?filter%5Bdone%5D%5B%3D%5D=${
            done ? 1 : 0
        }&limit=${limit}&page=${done ? donePage : todoPage}
    &meta=filter_count,page,page_count&sort=-modified_on`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ABcEHA2kcrKY4a6ipUA3',
            },
        },
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not fetch Items');
            }

            return response.json();
        })
        .then((body) => {
            if (done) {
                doneCount = body.meta.filter_count;
                updateDoneCount();
                donePageCount = body.meta.page_count;
                $doneList.innerHTML = '';

                body.data.forEach((doneItem) => {
                    printDoneItem(doneItem);
                });

                $doneList.classList.remove('loading');
            } else {
                todoCount = body.meta.filter_count;
                updateTodoCount();
                todoPageCount = body.meta.page_count;
                $todoList.innerHTML = '';

                body.data.forEach((todoItem) => {
                    printTodoItem(todoItem);
                });

                $todoList.classList.remove('loading');
            }

            printPagination(done);
        })
        .catch((err) => {
            console.error(err);

            if (done) {
                $doneList.classList.remove('loading');
            } else {
                $todoList.classList.remove('loading');
            }
        });
}

function changePage(event, done) {
    if (event.target.matches('.pagination-link')) {
        const newPage = parseInt(event.target.textContent);

        if (done) {
            donePage = newPage;
        } else {
            todoPage = newPage;
        }

        fetchAllItems(done);
    }
}

function changeTodoPage(event) {
    changePage(event, false);
}

function changeDonePage(event) {
    changePage(event, true);
}

fetchAllItems(false);
fetchAllItems(true);

$saveBtn.addEventListener('click', saveBtnClick);
$clearBtn.addEventListener('click', clearAllBtnClick);
$todoList.addEventListener('click', todoListClick);
$doneList.addEventListener('click', doneListClick);
$todoPagination.addEventListener('click', changeTodoPage);
$donePagination.addEventListener('click', changeDonePage);
