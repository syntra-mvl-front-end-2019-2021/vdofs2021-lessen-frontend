const app = new Vue({
    el: '#app',
    data() {
        return {
            topDisplay: '',
            bottomDisplay: '',
            operator: '',
            calcResult: false,
            history: [],
            topRowOperators: ['C', 'ⁿ', '√', '/'],
            rightColOperators: ['*', '-', '+', '='],
        };
    },
    computed: {},
    methods: {
        insertNumber(number) {
            if (this.calcResult) {
                this.bottomDisplay = '';
                this.calcResult = false;
            }
            this.bottomDisplay += number;
        },
        insertEqual() {
            if (!this.topDisplay || !this.bottomDisplay || !this.operator) {
                return;
            }

            const topNumber = parseFloat(this.topDisplay);
            const bottomNumber = parseFloat(this.bottomDisplay);
            let result;

            switch (this.operator) {
                case '+':
                    result = topNumber + bottomNumber;
                    break;
                case '-':
                    result = topNumber - bottomNumber;
                    break;
                case '*':
                    result = topNumber * bottomNumber;
                    break;
                case '/':
                    result = topNumber / bottomNumber;
                    break;
                case '√':
                    result = Math.pow(topNumber, 1 / bottomNumber);
                    break;
                case 'ⁿ':
                    result = Math.pow(topNumber, bottomNumber);
                    break;
            }

            this.history.unshift(
                `${topNumber} ${this.operator} ${bottomNumber} = ${result}`,
            );
            this.bottomDisplay = result.toString();
            this.topDisplay = '';
            this.operator = '';
            this.calcResult = true;
        },
        insertOperator(operator) {
            if (this.bottomDisplay[this.bottomDisplay.length - 1] === '.') {
                return;
            }

            switch (operator) {
                case '=':
                    this.insertEqual();
                    break;
                case 'C':
                    this.topDisplay = '';
                    this.bottomDisplay = '';
                    this.operator = '';
                    break;
                case '+-':
                    const bottomNumber = parseFloat(this.bottomDisplay);
                    this.bottomDisplay = (bottomNumber * -1).toString();
                    break;
                case '.':
                    if (this.bottomDisplay.includes('.')) {
                        return;
                    }

                    this.bottomDisplay += '.';
                    break;
                default:
                    if (!this.bottomDisplay) {
                        return;
                    }

                    if (this.topDisplay) {
                        this.operator = operator;
                        return;
                    }

                    this.topDisplay = this.bottomDisplay;
                    this.bottomDisplay = '';
                    this.operator = operator;
            }
        },
    },
});
