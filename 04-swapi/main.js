const $btnContainer = document.getElementById('btn-container');
const $resource = document.getElementById('resource');
const $pagination = document.getElementById('pagination');
const $paginationNext = document.getElementById('pagination-next');
const $paginationPrevious = document.getElementById('pagination-previous');
const $details = document.getElementById('details');

let activeResourceType = null;

function printPagination(previousUrl, nextUrl) {
    if (!previousUrl && !nextUrl) {
        $pagination.classList.add('hide');
        return;
    }

    $pagination.classList.remove('hide');

    if (previousUrl) {
        $paginationPrevious.disabled = false;
        $paginationPrevious.dataset.url = previousUrl;
    } else {
        $paginationPrevious.disabled = true;
    }

    if (nextUrl) {
        $paginationNext.disabled = false;
        $paginationNext.dataset.url = nextUrl;
    } else {
        $paginationNext.disabled = true;
    }
}

function printResourceBtns(resources) {
    for (let resource in resources) {
        const btn = `<button class="resource-btn" data-url="${resources[resource]}">${resource}</button>`;

        $btnContainer.insertAdjacentHTML('beforeend', btn);
    }
}

function printResource(resource) {
    $resource.innerHTML = '';
    resource.forEach(function (val) {
        const listItem = `<li><button class="details-btn" data-url="${
            val.url
        }">${val.name ? val.name : val.title}</button></li>`;

        $resource.insertAdjacentHTML('beforeend', listItem);
    });
}



function printDetails($btn, data) {
    $details.innerHTML = '';

    const promiseArray = [];

    for (let key in data) {
        switch (key) {
            case 'homeworld':
                promiseArray.push(
                    fetchResource(data[key]).then(function (body) {
                        return [key, body.name];
                    }),
                );
                break;
            case 'starships':
            case 'pilots':
            case 'residents':
            case 'people':
            case 'films':
            case 'vehicles':
            case 'species':
            case 'planets':
            case 'characters':
                const characterArray = data[key].map(function(url) {
                    return fetchResource(url).then(function (body) {
                        return body.name ? body.name : body.title;
                    });
                });
                promiseArray.push(Promise.all(characterArray).then(function(nameArray) {
                    return [key, nameArray.join(', ')];
                }));
                break;
            case 'url':
                break;
            case 'created':
            case 'edited':
                const formatedDate = new Date(data[key]).toLocaleString();

                promiseArray.push(
                    new Promise(function (resolve) {
                        resolve([key, formatedDate]);
                    }),
                );
                break;
            default:
                promiseArray.push(
                    new Promise(function (resolve) {
                        resolve([key, data[key]]);
                    }),
                );
        }
    }

    Promise.allSettled(promiseArray).then(function (results) {
        results
            .filter(function (result) {
                return result.status === 'fulfilled';
            })
            .forEach(function (result) {
                const template = `<p><strong>${result.value[0]}:</strong> ${result.value[1] ? result.value[1] : '/'}</p>`;
                $details.insertAdjacentHTML('beforeend', template);
            });

        $btn.classList.remove('loading');
    });
}

function fetchResource(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('request failed');
            }

            return response.json();
        })
        .catch(function (error) {
            console.error(error);
        });
}

function fetchAllResources() {
    $btnContainer.classList.add('loading');
    fetchResource('https://swapi.dev/api/').then(function (body) {
        printResourceBtns(body);
        $btnContainer.classList.remove('loading');
    });
}

function resourceBtnClicked(event) {
    if (event.target.matches('.resource-btn')) {
        event.target.classList.add('loading');
        $resource.classList.add('loading');

        activeResourceType = event.target.textContent.trim();

        fetchResource(event.target.dataset.url).then(function (body) {
            printResource(body.results);
            printPagination(body.previous, body.next);
            event.target.classList.remove('loading');
            $resource.classList.remove('loading');
        });
    }
}

function resourceDetailsBtnClicked(event) {
    if (event.target.matches('.details-btn')) {
        event.target.classList.add('loading');
        fetchResource(event.target.dataset.url).then(function (body) {
            printDetails(event.target, body);
        });
    }
}

fetchAllResources();

$btnContainer.addEventListener('click', resourceBtnClicked);
$pagination.addEventListener('click', resourceBtnClicked);
$resource.addEventListener('click', resourceDetailsBtnClicked);
