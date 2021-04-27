const app = new Vue({
    el: '#app',
    data() {
        return {
            message: 'Hello vue',
            link: 'https://google.com',
            newQuestion: '',
            newAnswer: '',
            filtered: false,
            faqs: [
                {
                    question: 'test1?',
                    answer: `<p>test test test. </p>
                    <p>test test test</p>`,
                    open: true,
                },
                {
                    question: 'test2?',
                    answer: 'test test tesasdt.',
                    open: false,
                },
                {
                    question: 'test3?',
                    answer: 'tedsst test test.',
                    open: false,
                },
                {
                    question: 'test4?',
                    answer: 'tesasdfgaert test test.',
                    open: false,
                },
            ],
        };
    },
    computed: {
        filteredFaqs() {
            if (this.filtered) {
                return this.faqs.filter((val) => val.answer.length < 20);
            }

            return this.faqs;
        },
    },
    methods: {
        toggleFiltered() {
            this.filtered = !this.filtered;
        },
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
