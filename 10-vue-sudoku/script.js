const app = new Vue({
    el: '#app',
    data() {
        return {
            sudoku: null,
            fixed: [],
            selectedSquare: null,
            message: '',
        };
    },
    created() {
        this.fetchSudoku();
    },
    computed: {
        subGridIndexes() {
            if (!this.selectedSquare) {
                return [];
            }

            const colIndex = this.selectedSquare[0];
            const lineIndex = this.selectedSquare[1];

            return this.getSubgridIndexes(colIndex, lineIndex);
        },
    },
    methods: {
        colArrays() {
            return this.sudoku.map((line, lineIndex, sudoku) => {
                return line.map((val, colIndex, line) => {
                    return sudoku[colIndex][lineIndex];
                });
            });
        },
        subGridArrays() {
            const subgrids = [];

            for (let x = 0; x < 9; x += 3) {
                for (let y = 0; y < 9; y += 3) {
                    const subgridIndexes = this.getSubgridIndexes(x, y);
                    const subgrid = subgridIndexes.map(
                        (val) => this.sudoku[val[0]][val[1]],
                    );
                    subgrids.push(subgrid);
                }
            }

            return subgrids;
        },
        getSubgridIndexes(colIndex, lineIndex) {
            const subGridIndexes = [];
            const colStart = colIndex - (colIndex % 3);
            const lineStart = lineIndex - (lineIndex % 3);

            for (let x = colStart; x < colStart + 3; x++) {
                for (let y = lineStart; y < lineStart + 3; y++) {
                    subGridIndexes.push([x, y]);
                }
            }

            return subGridIndexes;
        },
        checkSquareActive(colIndex, lineIndex) {
            if (!this.selectedSquare) {
                return false;
            }

            const inSubgrid =
                this.subGridIndexes.filter(
                    (val) => val[0] === colIndex && val[1] === lineIndex,
                ).length > 0;

            return (
                colIndex === this.selectedSquare[0] ||
                lineIndex === this.selectedSquare[1] ||
                inSubgrid
            );
        },
        squareClick(colIndex, lineIndex) {
            this.selectedSquare = [colIndex, lineIndex];
        },
        inputClick(num) {
            if (!this.selectedSquare) {
                return;
            }

            const line = this.sudoku[this.selectedSquare[1]];
            line[this.selectedSquare[0]] = num;

            Vue.set(this.sudoku, this.selectedSquare[1], line);
            this.selectedSquare = null;
        },
        hasDuplicates(arr) {
            return new Set(arr).size !== arr.length;
        },
        isSudokuCorrect() {
            const allGroups = this.sudoku.concat(
                this.colArrays(),
                this.subGridArrays(),
            );

            return (
                allGroups.filter(
                    (val) => this.hasDuplicates(val) || val.includes(0),
                ).length === 0
            );
        },
        checkClick() {
            if (this.isSudokuCorrect()) {
                this.message = 'All good';
                return;
            }

            this.message = 'No good';
        },
        encodeBoard() {
            return this.sudoku.reduce(
                (result, row, i) =>
                    result +
                    `%5B${encodeURIComponent(row)}%5D${
                        i === this.sudoku.length - 1 ? '' : '%2C'
                    }`,
                '',
            );
        },
        encodeParams(params) {
            return Object.keys(params)
                .map(
                    (key) =>
                        key + '=' + `%5B${this.encodeBoard(params[key])}%5D`,
                )
                .join('&');
        },
        solveClick() {
            let data = { board: this.sudoku };
            fetch('https://sugoku.herokuapp.com/solve', {
                method: 'POST',
                body: this.encodeParams(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Could not check solution');
                    }
                    return response.json();
                })
                .then((response) => (this.sudoku = response.solution))
                .catch((error) => console.error(error));
        },
        fetchSudoku() {
            fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Could not fetch sudoku');
                    }

                    return response.json();
                })
                .then((body) => {
                    this.sudoku = body.board;
                    this.fixed = this.genFixedNumbers(body.board);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        checkFixedNumbers(colIndex, lineIndex) {
            return this.fixed.includes(`${colIndex}_${lineIndex}`);
        },
        genFixedNumbers(board) {
            return board.reduce((fixedLineNumbers, line, lineIndex) => {
                const fixedSquares = line.reduce(
                    (fixedSquareNumbers, square, colIndex) => {
                        if (square > 0) {
                            fixedSquareNumbers.push(`${colIndex}_${lineIndex}`);
                        }

                        return fixedSquareNumbers;
                    },
                    [],
                );

                return fixedLineNumbers.concat(fixedSquares);
            }, []);
        },
    },
});
