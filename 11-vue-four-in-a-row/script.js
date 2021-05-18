const app = new Vue({
    el: '#app',
    data() {
        return {
            colCount: 7,
            rowCount: 6,
            board: [],
            turn: 1,
            gameOver: false,
            gameFull: false,
        };
    },
    created() {
        this.board = this.initBoard();
    },
    computed: {
        colorGroups() {
            const groups = this.checkCols().concat(
                this.checkRows(),
                this.checkDiagonals(),
            );

            return groups.filter((group) => group.length >= 4);
        },
        rows() {
            // const rows = [];
            //
            // for (let y = 0; y < this.rowCount; y++) {
            //     const row = [];
            //     for (let x = 0; x < this.colCount; x++) {
            //         row.push(this.board[x][y]);
            //     }
            //     rows.push(row);
            // }
            // return rows;

            const rows = [];
            for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
                rows.push(this.makeSearchArrays(0, rowIndex, 1, 0));
            }
            return rows;
        },
        diagonals() {
            const diagonals = [];

            for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
                diagonals.push(this.makeSearchArrays(0, rowIndex, 1, 1));
                diagonals.push(this.makeSearchArrays(0, rowIndex, 1, -1));
            }

            for (let colIndex = 1; colIndex < this.colCount; colIndex++) {
                diagonals.push(this.makeSearchArrays(colIndex, 0, 1, 1));
                diagonals.push(
                    this.makeSearchArrays(colIndex, this.rowCount - 1, 1, -1),
                );
            }

            return diagonals;
        },
    },
    methods: {
        reset() {
            this.board = this.initBoard();
            this.gameOver = false;
            this.gameFull = false;
            this.turn = 1;
        },
        initBoard() {
            const board = [];
            for (let x = 0; x < this.colCount; x++) {
                const row = [];
                for (let y = 0; y < this.rowCount; y++) {
                    row.push(0);
                }
                board.push(row);
            }
            return board;
        },
        changeTurn() {
            if (this.turn === 1) {
                this.turn = 2;
            } else {
                this.turn = 1;
            }
        },
        checkGameFull() {
            return (
                this.board
                    .map((col) => col.filter((cell) => cell === 0))
                    .filter((col) => col.length > 0).length === 0
            );
        },
        firstEmptyIndex(col) {
            // return col.reduce((emptyIndex, cell, cellIndex) => {
            //     if (emptyIndex > -1) {
            //         return emptyIndex;
            //     }
            //
            //     if (cell === 0) {
            //         return cellIndex;
            //     }
            //
            //     return -1;
            // }, -1);

            for (let i = 0; i < col.length; i++) {
                if (col[i] === 0) {
                    return i;
                }
            }

            return -1;
        },
        colClicked(colIndex) {
            if (this.gameOver || this.gameFull) {
                return;
            }
            const selectedCol = this.board[colIndex];
            const firstEmptyIndex = this.firstEmptyIndex(selectedCol);

            if (firstEmptyIndex === -1) {
                return;
            }

            selectedCol[firstEmptyIndex] = this.turn;
            Vue.set(this.board, colIndex, selectedCol);

            if (this.colorGroups.length > 0) {
                this.gameOver = true;
                return;
            }

            if (this.checkGameFull()) {
                this.gameFull = true;
                return;
            }

            this.changeTurn();
        },
        checkCols() {
            // const splitCols = [];
            //
            // this.board.map(this.groupColors).forEach((splitCol) => {
            //     splitCol.forEach((group) => {
            //         if (group) {
            //             splitCols.push(group);
            //         }
            //     });
            // });
            //
            // return splitCols;

            return [].concat(...this.board.map(this.groupColors));
        },
        checkRows() {
            return [].concat(...this.rows.map(this.groupColors));
        },
        checkDiagonals() {
            return [].concat(...this.diagonals.map(this.groupColors));
        },
        groupColors(arr) {
            const splitCol = [];
            for (let y = 0; y < arr.length; y++) {
                const curCell = arr[y];
                if (curCell === 0) {
                } else if (splitCol.length === 0) {
                    splitCol.push([curCell]);
                } else {
                    const prevCell = arr[y - 1];

                    if (curCell === prevCell) {
                        splitCol[splitCol.length - 1].push(curCell);
                    } else {
                        splitCol.push([curCell]);
                    }
                }
            }
            return [].concat(splitCol);
        },
        makeSearchArrays(
            startColIndex,
            startRowIndex,
            colIncrement,
            rowIncrement,
        ) {
            const newSearchArray = [];
            let colIndex = startColIndex;
            let rowIndex = startRowIndex;
            while (
                colIndex < this.colCount &&
                rowIndex < this.rowCount &&
                colIndex >= 0 &&
                rowIndex >= 0
            ) {
                newSearchArray.push(this.board[colIndex][rowIndex]);
                colIndex += colIncrement;
                rowIndex += rowIncrement;
            }
            return newSearchArray;
        },
    },
});
