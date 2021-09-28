const state = {
    curSlide: 0,
    totalSlides: 0,
    slideWidth: 0,
    sliderWidth: 0,
    slidesShown: 0,
    elements: {
        $prevBtn: null,
        $nextBtn: null,
        $slides: null,
    },
};

function scroll(next) {
    console.log(state);

    if (next) {
        if (state.curSlide < state.totalSlides - state.slidesShown + 1) {
            state.curSlide++;
        }
    } else {
        if (state.curSlide > 0) {
            state.curSlide--;
        }
    }

    state.elements.slides.scrollLeft = state.slideWidth * state.curSlide;
}

function initState() {
    state.totalSlides = state.elements.slides.children.length;
    state.slideWidth = state.elements.slides.children[0].clientWidth;
    state.sliderWidth = state.elements.slides.clientWidth;
    state.slidesShown = Math.floor(state.sliderWidth / state.slideWidth);
    state.elements.slides.scrollLeft = 0;
}

function selectSlide(e) {
    state.elements.main.src = e.target.src;
}

function setCurSlide(e) {
    const scrolPos = Math.ceil(e.target.scrollLeft);
    state.curSlide = Math.floor(scrolPos / state.slideWidth);
}

function initSlider() {
    state.elements.prevBtn = document.getElementById('prev-btn');
    state.elements.nextBtn = document.getElementById('next-btn');
    state.elements.slides = document.getElementById('slides');
    state.elements.main = document.getElementById('main');

    initState();

    state.elements.prevBtn.addEventListener('click', function (e) {
        e.preventDefault();

        scroll(false);
    });

    state.elements.nextBtn.addEventListener('click', function (e) {
        e.preventDefault();

        scroll(true);
    });

    state.elements.slides.addEventListener('click', selectSlide);

    state.elements.slides.addEventListener('scroll', setCurSlide);
}

window.addEventListener('load', initSlider);
window.addEventListener('resize', initState);
