Vue.component('hello-world', {
    props: ['message'],
    methods: {
        changeMessage() {
            this.$emit('change-message');
        },
    },
    template: '<p @click="changeMessage">Hello {{message}}</p>',
});

Vue.component('slotted', {
    template: `<p class="slotted"><slot></slot></p>`,
});

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0,
        };
    },
    methods: {
        addCount() {
            this.count++;
        },
        changeMessage() {
            this.count = 0;
        },
    },
    template: `
    <div>
        <slotted>
        <button>test 123</button>
        </slotted>
        <hello-world @change-message="changeMessage" :message="'Korneel ('+count+')'"></hello-world>
        <button @click="addCount">
            You clicked me {{ count }} times.
        </button>
    </div>
    `,
});

const app = new Vue({
    el: '#app',
    data() {
        return {};
    },
});
