const app = new Vue({
    el: '#app',
    data() {
        return {
            sudoku: null,
        };
    },
    methods: {
        fetchSudoku() {
            fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Could not fetch sudoku');
                    }

                    return response.json();
                })
                .then((body) => {
                    console.log(body);
                    this.sudoku = body.board;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
});
