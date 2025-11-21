// Init Module
const init = (function (){
    // Initial Data
    const DIMENSION = 3;
    const scores = {
        player_score: 0,
        comp_score: 0,
        num_ties: 0,
    };
    // Graphics of X and O
    let X = {
        dimension: 20,
        color: "#000000",
        path: "m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z",
    }
        let O = {
        dimension: 20,
        color: "#000000",
        path: "M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z",
    }

    // Caching the DOM
    const gameboard = document.getElementById("gameboard");
    const grid = gameboard.querySelector("#middle-rows");
    const scores_wrapper = gameboard.querySelector("#bottom-row");
    const turn_wrapper = gameboard.querySelector("#turn-wrapper");
    const turn_template = gameboard.querySelector("#turn-template").innerHTML;
    const scores_template = scores_wrapper.querySelector("#scores-template").innerHTML;

    // Initial rendering
    turn_wrapper.innerHTML = Mustache.render(turn_template, X);
    scores_wrapper.innerHTML = Mustache.render(scores_template, scores);
    
    // Initializing grid item dataset of rows and columns
    (function (){
        const grid_items = grid.children;
        let child_index = 0;
        for(let row = 0; row < DIMENSION; row++){
            for(let col = 0; col < DIMENSION; col++){
                grid_items[child_index].dataset.row = row;
                grid_items[child_index].dataset.col = col;
                child_index++;
            }
        }

    })();
        return {data: {DIMENSION, scores},
        graphics: {X, O},
        wrappers: {turn_wrapper, scores_wrapper},
        templates: {turn_template, scores_template},
        gameboard};

})(); // End init module

// Turn Module
// Score module
const createPlayer = function(id){
    // Counter for number of times a particular row/col/diagonal is used
    // [row0, row1, row2, col0, col1, col2, diag1, diag2]
    // When one of the above reaches 3, we have a winning condition
    const personal_counter = new Array(8).fill(0); 
    let score = 0; 

    function move(row, col){
        row = parseInt(row);
        col = parseInt(col);
        // Row and Column counter automatically incremented
        personal_counter[row] += 1;
        personal_counter[parseInt(col) + 3] += 1; // + 3 because col index is shifted by 3 in personal_counter
        // Incrementing diagonal patterns
        if(row === col){
            personal_counter[6] += 1; // main diagonal
        }
        if(parseInt(row) + parseInt(col) === 2){
            personal_counter[7] += 1; // counter diagonal
        }
    }
    function isWinner(){
        return personal_counter.includes(3);
    }
    function reset(){
        personal_counter.fill(0);
    }
        
    return {id, move, isWinner, reset};
};
// Gameboard Module
const gameBoard = (function () {

    const first_player = createPlayer("X");
    const second_player = createPlayer("O");
    const GRID_SIZE = init.data.DIMENSION;
    const board_dom = init.gameboard;
    const scores = init.data.scores;
    const board = createGameBoard();
    let turn = 0;
    const turn_map = {0: "X", 1: "O"};


    // Event Listeners
    board_dom.addEventListener("click", drawSymbol);
    //board_dom.addEventListener("click", reset);
    // Render Function
    function _render(cell){

        cell.innerHTML = turn_map[turn];
        turn = (turn + 1) % 2;

    }
    // Backend Functions
    function drawSymbol(event){
        if(event.target.classList.contains("grid-item")){
            const player = (turn % 2 === 0) ? first_player : second_player;
            const [row, col] = [parseInt(event.target.dataset.row), parseInt(event.target.dataset.col)];
            board[row][col] = turn_map[turn];
            player.move(row, col);
            _render(event.target.firstChild);
            if(player.isWinner()){
                alert(`Player ${player.id} wins this round!`);
            }
        }
    }

    
    function createGameBoard(){
        const board = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null));
        return board;

    }



})();

