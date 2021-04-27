const app = new Vue({
    el: '#app',
    data() {
        return {
            codeLength: 5,
            maxGuesses: 10,
            colorArray: [
                'wit',
                'geel',
                'oranje',
                'rood',
                'paars',
                'blauw',
                'groen',
            ],
            guessCount: 0,
            solution: [],
            currentGuess: [],
            gameOver: false,
            won: false,
            guessHistory: [],
        };
    },
    created() {
        this.initGameState();
    },
    methods: {
        initGameState() {
            this.guessCount = 0;
            this.gameOver = false;
            this.won = false;
            this.solution = this.genAiCode();
            this.currentGuess = [];
            this.guessHistory = [];
        },
        undo() {
            this.currentGuess.pop();
        },
        submit() {
            if (this.currentGuess.length !== this.codeLength) {
                return;
            }

            const correctPlaceCount = this.checkCorrectNumberAndPlace();
            const correctCount = this.checkCorrectNumber(correctPlaceCount);

            this.guessCount++;
            this.guessHistory.push({
                code: this.currentGuess,
                correctCount,
                correctPlaceCount,
            });

            if (correctPlaceCount === this.codeLength) {
                this.gameOver = true;
                this.won = true;
            } else if (this.guessCount === this.maxGuesses) {
                this.gameOver = true;
                this.won = false;
            }

            this.currentGuess = [];
        },
        checkCorrectNumber(correctNumberAndPlace) {
            let correctNumber = 0;

            let solCount = [0, 0, 0, 0, 0, 0, 0];
            let guessCount = [0, 0, 0, 0, 0, 0, 0];

            for (let i = 0; i < this.colorArray.length; i++) {
                for (let j = 0; j < this.codeLength; j++) {
                    if (this.currentGuess[j] === i) {
                        guessCount[i]++;
                    }

                    if (this.solution[j] === i) {
                        solCount[i]++;
                    }
                }

                correctNumber += Math.min(solCount[i], guessCount[i]);
            }

            return correctNumber - correctNumberAndPlace;
        },
        checkCorrectNumberAndPlace() {
            let correctNumberAndPlace = 0;

            for (let i = 0; i < this.codeLength; i++) {
                if (this.solution[i] === this.currentGuess[i]) {
                    correctNumberAndPlace++;
                }
            }

            return correctNumberAndPlace;
        },
        addColor(index) {
            if (this.currentGuess.length === this.codeLength) {
                return;
            }
            this.currentGuess.push(index);
        },
        genAiCode() {
            let aiCode = [];
            for (let i = 0; i < this.codeLength; i++) {
                const randomIndex = Math.floor(
                    Math.random() * this.colorArray.length,
                );
                aiCode.push(randomIndex);
            }

            console.log(aiCode);
            return aiCode;
        },
    },
});
