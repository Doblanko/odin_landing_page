// Factory function for players
const Player = (player, symbol) => {
    let playerName = player
    let playerSymbol = symbol

    const setName = name => {
        if (name != "") {
            playerName = name
        }
    }

    const getName = () => playerName

    const getSymbol = () => playerSymbol


    return { setName, getName, getSymbol  }
}

// Module for the GameBoard functionality
const Gameboard = (() => {
    let gameArr = 
   [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]]

    const _compareMatrix = (matrix1, matrix2) => {
        // check if 2 matrices are equivalent

        if (matrix1[0] == matrix2[0]) {
            if (matrix1[1] == matrix2[1]) {
               if (matrix1[2] == matrix2[2]) {
                    return true
               }
            }
        }
    }

    const checkIfAvail = (row, col, symbol) => {
        // check if position is available to make a play
        // if it is available, make play
        if (gameArr[row][col] == 0) {
            gameArr[row][col] = symbol
            return true
        } else {
            return false
        }
    }

    const checkWinner = (currentPlayerSymbol) => {
        let winningArr = [currentPlayerSymbol, currentPlayerSymbol, currentPlayerSymbol]
        // check rows then columns
        for (let i = 0; i < 3; i++) {
            
            if (_compareMatrix(gameArr[i], winningArr)) {return true}

            let column = []
            for (let j = 0; j < 3; j ++) {
                column.push(gameArr[j][i])
            }

            if (_compareMatrix(column, winningArr)) {return true}
        }

        // check diagonals
        let diagonal1 = [gameArr[0][0], gameArr[1][1], gameArr[2][2]]
        let diagonal2 = [gameArr[0][2], gameArr[1][1], gameArr[2][0]]

        if (_compareMatrix(diagonal1, winningArr)) {return true}
        if (_compareMatrix(diagonal2, winningArr)) {return true}


        return false
    }

    

    return {checkWinner, checkIfAvail}
})()

// Module to control the flow of the game
const gameController = (() => {
    let game = {
        "player1": null,
        "player2": null,
        "currentPlayer": 0,
        "isTied": false,
        "isOver": false,
    }

    const startGame = (player1, player2) => {
        game.player1 = player1
        game.player2 = player2
        game.currentPlayer = game.player1
    }

    const makePlay = (boxID) => {
        // make a play on the board

        // compute the location from the box ID
        row = Math.floor((boxID - 1) / 3)
        col = ((boxID - 1) % 3)

        // Make the play if the box is available
        // Render the play, check for winner, then change turns
        if (Gameboard.checkIfAvail(row, col, game.currentPlayer.getSymbol())) {
            displayController.render(boxID, game.currentPlayer.getSymbol())
            
            if (Gameboard.checkWinner(game.currentPlayer.getSymbol())) {
                displayController.winner(game.currentPlayer)
            }
            
            changeTurns()
        }
    }

    const changeTurns = () => {
        if (game.currentPlayer == game.player1) {
            game.currentPlayer = game.player2
        } else {
            game.currentPlayer = game.player1
        }
        
    }

    return { startGame, makePlay }
})()

// Module for display control
const displayController = (() => {
  
    const render = (boxID, symbol) => {
        let box = document.getElementById(`${boxID}`)
        box.textContent = symbol
    }

    const resetGrid = () => {
        // Removes all entries in the board
        document.querySelectorAll(".box").forEach(box => {box.textContent = ""})
    }

    const winner = (currentPlayer) => {
        document.getElementById("winner").textContent = `${currentPlayer.getName()} wins!`
    }

    return { render, resetGrid, winner }
})()

// Event Listeners
const gridBoxes = document.querySelectorAll(".box")
gridBoxes.forEach((box) => {
    box.addEventListener('click', boxClick)
})

// Listener function
function boxClick(event) {
    // make the play
    gameController.makePlay(event.target.id)
}

let player1 = Player("Player 1", "X")
let player2 = Player("Player 2", "O")
gameController.startGame(player1, player2)