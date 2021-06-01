document.getElementById('start-btn').addEventListener('click', function () {
    document.querySelectorAll('.transition').forEach((el) => {
        el.classList.toggle('transition--wide');
    });
});

document.getElementById('nav').addEventListener('click', (event) => {
    if (event.target.matches('.nav-item')) {
        document
            .querySelector('.nav-item--active')
            .classList.remove('nav-item--active');
        event.target.classList.add('nav-item--active');
    }
});
