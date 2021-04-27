const app = new Vue({
    el: '#app',
    data() {
        return {
            message: 'Hello vue',
            link: 'https://google.com',
            newQuestion: '',
            newAnswer: '',
            faqs: [
                {
                    question: 'test1?',
                    answer: `<p>test test test. </p>
                    <p>test test test</p>`,
                    open: true,
                },
                {
                    question: 'test2?',
                    answer: 'test test test.',
                    open: false,
                },
                {
                    question: 'test3?',
                    answer: 'test test test.',
                    open: false,
                },
                {
                    question: 'test4?',
                    answer: 'test test test.',
                    open: false,
                },
            ],
        };
    },
    methods: {
        toggleAccordeon(index) {
            this.faqs[index].open = !this.faqs[index].open;
        },
        saveFaq() {
            this.faqs.push({
                question: this.newQuestion,
                answer: this.newAnswer,
                open: false,
            });

            this.newQuestion = '';
            this.newAnswer = '';
        },
    },
});
