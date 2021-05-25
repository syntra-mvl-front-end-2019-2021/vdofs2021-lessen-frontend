Vue.component('modal', {
    props: ['show', 'title'],
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
    },
    template: `
        <div @click.self="closeModal" :class="{'c-modal__background': true, 'c-modal--show': show}">
            <div class="c-modal__window">
                <header class="c-modal__title">
                    {{title}}
                </header>
                <button @click="closeModal" class="c-modal__close-btn">x</button>
                <div class="c-modal__content">
                    <slot></slot>
                </div>
            </div>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    data() {
        return { modalOpen: true };
    },
    methods: {
        openModal() {
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
        },
    },
});
