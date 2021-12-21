function computerPlay() {
    // random number from 0 to 2
    let hand = Math.floor(Math.random() * 3);

    switch(hand) {
        case 0: 
            return 'rock';
            break;
        case 1: 
            return 'paper';
            break;
        case 2: 
            return 'scissors';
            break;
    };
}

function game() {
    let score = [0, 0];
    let computerSelection = '';
    let playerSelection = '';
    let roundResult;

    for (let i = 1; i <= 5; i++) {
        computerSelection = computerPlay();
        playerSelection = prompt('Select rock, paper, or scissors:')
        roundResult = playRound(playerSelection, computerSelection)

        switch(roundResult[1]) {
            case -1:
                break;
            case 0:
                score[1]++
                break;
            case 1:
                score[0]++
                break;
        }
        console.log(roundResult[0] + ` The score is ${score[0]}-${score[1]}.`);
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
    
        return dict[combo];
    }
}

game();