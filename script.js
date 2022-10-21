const documentBoard = document.getElementById("board");

//MODULES
const gameBoard = (() => {
    let boardArray =
        [" ", " ", " ",
            " ", " ", " ",
            " ", " ", " "];

    let counter = 0;
    for (let i = 0; i < boardArray.length; i++) {
        let div = document.createElement('div');
        div.className = 'cell';
        div.dataset.index = counter.toString();
        documentBoard.append(div);
        counter = counter + 1;
    }

    const addToBoard = (num, mark) => {
        boardArray[num] = mark;
    }

    return {
        boardArray,
        addToBoard,
    };
})();

//FACTORY FUNCTIONS 
//PLAYER OBJECT
const player = (name, marker) => {
    const sayHello = () => {
        console.log("Hi my name is " + name + " and my marker is " + marker)
    };
    return { name, marker, sayHello };
};

//VARIBAL DECLARATION
const cellElements = document.querySelectorAll(".cell");
const overlay = document.getElementById('overlay');
const gameOverModal = document.getElementById('gameOverModal');
const gameOverMsg = document.getElementById('gameOverMsg');
const circlePlayer = player("Player Circle", "circle");
const xPlayer = player("Player X", "x")
let circleTurn;
let winner = undefined;

//FUNCTIONS
function playGame() {
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    });
}

function handleClick(e) {
    const cell = e.target;
    const indexNum = cell.dataset.index;
    const currentClass = circleTurn ? circlePlayer.marker : xPlayer.marker;

    gameBoard.addToBoard(indexNum, currentClass);
    placeMark(cell, currentClass);
    checkBoard();
    swapTurn();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn;
    documentBoard.classList.remove('circle');
    documentBoard.classList.remove('x');
    if (circleTurn === true) {
        documentBoard.classList.add('circle');
    }
    else {
        documentBoard.classList.add('x');
    }

}

function checkBoard() {
    let isFilled = true;

    let array = gameBoard.boardArray;
    console.log(array);

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winningCombos.forEach(combo => {

        let xWin = true;
        let circleWin = true;

        combo.forEach(cell => {
            if (array[cell] != 'x') {
                xWin = false;
            }
            if (array[cell] != 'circle') {
                circleWin = false;
            }
        });

        if (xWin === true) {
            winner=xPlayer;
            endGame(xPlayer);
        };

        if (circleWin === true) {
            winner=circlePlayer;
            endGame(circlePlayer);
        };

    });

    array.forEach(cell => {
        if (cell === " ") {
            isFilled = false;
        }
    });

    if (isFilled === true && winner=== undefined) {
        endGame();
    }
}

function endGame(player) {
    overlay.classList.add('active');
    gameOverModal.classList.add('active');
    if (player == undefined) {
        gameOverMsg.innerHTML = " TIE GAME!";
    }
    else {
        gameOverMsg.innerHTML = " GAME OVER " + player.name + " WINS! ";
    }
}


//GAME FLOW
const startGame = (playerOne, playerTwo) => {
    documentBoard.classList.add(playerOne.marker);
    playGame();
};

startGame(xPlayer, circlePlayer);
