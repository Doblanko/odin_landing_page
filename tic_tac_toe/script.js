
// Factory function for players
const Player = (player) => {
    let playerName = player

    const setName = name => {
        if (name != "") {
            playerName = name
        }
    }

    const getName = () => {return playerName}

    return { getString, getSimpleString, setName, getName }
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

    const checkIfAvail = (row, col) => {

    }

    const checkWinner = () => {

    }

    return {changeScore, getScore, resetScore, checkWinner, checkIfAvail}
})()

// Module to control the flow of the game
const gameController = (() => {

})

// Module for display control
const displayController = (() => {
    let status = {
        currentPlayer: '',
    }
})()