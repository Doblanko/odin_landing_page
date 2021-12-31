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

    const changeScore = (row, col, player) => {
        gameArr[row][col] = player
    }
    
    const resetScore = () => {

    }

    const getScore = () => {

    }

    const checkIfAvail = (row, col, symbol) => {
        if (gameArr[row][col] == 0) {
            gameArr[row][col] = symbol
            return true
        } else {
            return false
        }
    }

    const checkWinner = () => {

    }

    return {changeScore, getScore, resetScore, checkWinner, checkIfAvail}
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
        // compute the location from the box ID
        row = Math.floor((boxID - 1) / 3)
        col = ((boxID - 1) % 3)
        if (Gameboard.checkIfAvail(row, col, game.currentPlayer.getSymbol())) {
            displayController.render(boxID, game.currentPlayer.getSymbol())
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

    return { render, resetGrid }
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