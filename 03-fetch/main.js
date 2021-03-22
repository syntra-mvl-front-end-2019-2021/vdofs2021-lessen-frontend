const $btnContainer = document.getElementById('btn-container');
const $resource = document.getElementById('resource');

function printResourceBtns(resources) {
    // Object.keys(body).forEach(function (resource) {
    //     const btn = `<button>${resource}</button>`;
    //
    //      $btnContainer.insertAdjacentHTML('beforeend', btn);
    // });

    for (let resource in resources) {
        const btn = `<button class="resource-btn" data-url="${resources[resource]}">${resource}</button>`;

        $btnContainer.insertAdjacentHTML('beforeend', btn);
    }
}

function printResource(resource) {
    $resource.innerHTML = '';
    resource.forEach(function (val) {
        const listItem = `<li><button>${
            val.name ? val.name : val.title
        }</button></li>`;

        $resource.insertAdjacentHTML('beforeend', listItem);
    });
}

function fetchResource(url) {
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('request failed');
            }

            return response.json();
        })
        .then(function (body) {
            console.log(body);
            printResource(body.results);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function fetchAllResources() {
    fetch('https://swapi.dev/api/')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('request failed');
            }

            return response.json();
        })
        .then(function (body) {
            console.log(body);
            printResourceBtns(body);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function btnContainerClicked(event) {
    if (event.target.matches('.resource-btn')) {
        fetchResource(event.target.dataset.url);
    }
}

fetchAllResources();

$btnContainer.addEventListener('click', btnContainerClicked);
