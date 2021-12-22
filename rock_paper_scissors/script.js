function computerPlay() {
    // random number from 0 to 2
    let hand = Math.floor(Math.random() * 3);

    switch(hand) {
        case 0: return 'rock';
        case 1: return 'paper';
        case 2: return 'scissors';
    };
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    let dict = {
        'rockrock': ['Tie!', -1],
        'paperpaper': ['Tie!', -1],
        'scissorsscissors': ['Tie!', -1],
        'rockpaper': ['You Lose! Paper beats rock.', 0],
        'rockscissors': ['You Win! Rock beats scissors.', 1],
        'paperrock': ['You Win! Paper beats rock.', 1],
        'paperscissors': ['You Lose! Scissors beats paper.', 0],
        'scissorsrock': ['You Lose! Rock beats scissors.', 0],
        'scissorspaper': ['You Win! Scissors beats paper.', 1],
    };
    
    let combo = playerSelection + computerSelection;

    switch(dict[combo][1]) {
        case -1:
            break;
        case 0:
            computerScore++
            break;
        case 1:
            playerScore++
            break;
    };

    let scorePrint = document.querySelector('.score-print')

    if (playerScore == 5) {
        scorePrint.textContent = dict[combo][0] + ` You won the game ${playerScore}-${computerScore}.`
        resetGame();
    } else if (computerScore == 5) {
        scorePrint.textContent = dict[combo][0] + ` You lost the game ${playerScore}-${computerScore}.`
        resetGame();
    } else {
        scorePrint.textContent = dict[combo][0] + ` The score is ${playerScore}-${computerScore}.`
    } 
}

function resetGame(){
    playerScore = 0;
    computerScore = 0;
}

let playerScore = 0;
let computerScore = 0;
const buttons = document.querySelectorAll('.button-selection');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        playRound(button.id, computerPlay())
    });
});
