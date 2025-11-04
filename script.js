// Creating Objects

const gameBoard = (function() {

    const first_player = createPlayer("X");
    const second_player = createPlayer("O");

    function startGame(){

    }



}) ();

const createPlayer = function(id){
    // Counter for number of times a particular row/col/diagonal is used
    // [row0, row1, row2, col0, col1, col2, diag1, diag2]
    // When one of the above reaches 3, we have a winning condition
    const personal_counter = new Array(8).fill(0); 

    function move(row, col){
        // Row and Column counter automatically incremented
        personal_counter[row] += 1;
        personal_counter[col + 3] += 1; // + 3 because col index is shifted by 3 in personal_counter
        // Incrementing diagonal patterns
        if(row === col){
            personal_counter[6] += 1; // main diagonal
        }
        if(row + col === 2){
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
}