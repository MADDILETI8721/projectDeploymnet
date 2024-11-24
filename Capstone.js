var modal = document.getElementById("rulesModal");
var btn = document.getElementById("rulesButton");
var span = document.getElementsByClassName("close")[0];

function GamesRules() {
    modal.style.display = "block";
    return false;
}

btn.onclick = function() {
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let playerScore = localStorage.getItem("playerScore") ? parseInt(localStorage.getItem("playerScore")) : 0;
let computerScore = localStorage.getItem("computerScore") ? parseInt(localStorage.getItem("computerScore")) : 0;

function updateScores() {
    let computerScoreElement = document.querySelector('#DivComputerScore h1');
    let playerScoreElement = document.querySelector('#DivYourScore h1');

    computerScoreElement.style.marginTop = '10px';  
    playerScoreElement.style.marginTop = '10px';  

    computerScoreElement.style.color = 'black';  
    playerScoreElement.style.color = 'black';  

    computerScoreElement.textContent = computerScore;
    playerScoreElement.textContent = playerScore;

    localStorage.setItem("playerScore", playerScore);
    localStorage.setItem("computerScore", computerScore);
}

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let winner = '';

    document.getElementById('divImages').style.display = 'none';

    resetResultBorders();

    if (playerChoice === computerChoice) {
        winner = "tie";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        winner = "player";
    } else {
        computerScore++;
        winner = "computer";
    }
    updateScores();
    showChoiceImages(playerChoice, computerChoice);
    showResultMessage(winner);
}

function showChoiceImages(playerChoice, computerChoice) {
    const borderColors = {
        rock: 'rgba(21, 97, 202, 0.9)', // Sky Blue for rock
        paper: 'rgb(141, 62, 141)',     // Purple for paper
        scissors: 'orange'              // Orange for scissors
    };

    let playerImage = document.querySelector(`.choice-img[alt="${playerChoice}"]`);
    let computerImage = document.querySelector(`.choice-img[alt="${computerChoice}"]`);

    let playerResultImage = document.getElementById('playerResultImage');
    let computerResultImage = document.getElementById('computerResultImage');

    playerResultImage.src = playerImage.src;
    computerResultImage.src = computerImage.src;

    playerResultImage.style.border = `12px solid ${borderColors[playerChoice]}`;
    computerResultImage.style.border = `12px solid ${borderColors[computerChoice]}`;

    document.getElementById('playerChoiceText').textContent = "YOU PICKED";
    document.getElementById('computerChoiceText').textContent = "PC PICKED";

    document.getElementById('playerChoiceText').style.letterSpacing = '2px'; // Adjust the value as needed
    document.getElementById('computerChoiceText').style.letterSpacing = '2px'; // Adjust the value as needed
}

function resetResultBorders() {
    const playerResultImage = document.getElementById('playerResultImage');
    const computerResultImage = document.getElementById('computerResultImage');

    playerResultImage.style.boxShadow = '';
    computerResultImage.style.boxShadow = '';
}

function showResultMessage(winner) {
    document.getElementById('resultContainer').style.display = 'block';

    const resultText = document.getElementById('resultText');
    const playerResultImage = document.getElementById('playerResultImage');
    const computerResultImage = document.getElementById('computerResultImage');

    const winnerShadows = 'box-shadow: 0 0 0 22px  #29a329, 0 0 0 44px #1EB125CC, 0 0 0 66px   #5BCD60CC;';
    const circularStyle = 'border-radius: 50%;';

    if (winner === "player") {
        resultText.innerHTML = "<span class='spacingforResultText'>YOU WIN</span><br><span class='against'>AGAINST PC</span>";
        resultText.style.color = "white"; 

        playerResultImage.style.cssText = winnerShadows + circularStyle;

        document.getElementById('playAgainButton').style.display = 'inline-block';
        document.getElementById('NextButtonPage').style.display = 'inline-block';

        document.getElementById('TieRplayButton').style.display = 'none';
        document.getElementById('rulesButton').style.display = 'inline-block';

    } else if (winner === "computer") {
        resultText.innerHTML = "<span class='spacingforResultText'>YOU LOST</span><br><span class='against'>AGAINST PC</span>";
        resultText.style.color = "white"; 

        computerResultImage.style.cssText = winnerShadows + circularStyle;

        document.getElementById('playAgainButton').style.display = 'inline-block';
        document.getElementById('NextButtonPage').style.display = 'none'; // Hide Next button

        document.getElementById('TieRplayButton').style.display = 'none';
        document.getElementById('rulesButton').style.display = 'inline-block';

    } else {
        resultText.innerHTML = "TIE UP"; 
        resultText.style.color = "white";

        document.getElementById('playAgainButton').style.display = 'none';
        document.getElementById('NextButtonPage').style.display = 'none';
        document.getElementById('TieRplayButton').style.display = 'inline-block';
        document.getElementById('rulesButton').style.display = 'inline-block';
    }
}

function nextButtonPage() {
    document.getElementById('divImages').style.display = 'none'; 
    document.getElementById('resultContainer').style.display = 'none'; 
    document.getElementById('Divcongratulations').style.display = 'block';
    document.getElementById('playAgainButton').style.display = 'inline-block';
    document.getElementById('rulesButton').style.display = 'inline-block';
    document.getElementById('NextButtonPage').style.display = 'none';
    document.getElementById('rulesButton').classList.add('fixed-right');
}

function resetGame() {
    document.getElementById('Divcongratulations').style.display = 'none'; 
    document.getElementById('divImages').style.display = 'flex';
    document.getElementById('playAgainButton').style.display = 'none';  
    document.getElementById('NextButtonPage').style.display = 'none';  
    document.getElementById('resultContainer').style.display = 'none'; 
    document.querySelector('#DivComputerScore h1').textContent = computerScore;
    document.querySelector('#DivYourScore h1').textContent = playerScore;
    document.getElementById('playerResultImage').src = '';
    document.getElementById('computerResultImage').src = '';
    document.getElementById('resultText').textContent = '';
    document.getElementById('playerChoiceText').textContent = '';
    document.getElementById('computerChoiceText').textContent = '';
    resetResultBorders();
}

function TieReplayButton() {
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('divImages').style.display = 'flex'; 
    document.getElementById('playerResultImage').src = '';
    document.getElementById('computerResultImage').src = '';
    document.getElementById('resultText').textContent = '';
    document.getElementById('playerChoiceText').textContent = '';
    document.getElementById('computerChoiceText').textContent = '';
    document.getElementById('NextButtonPage').style.display = 'none'; 
    document.getElementById('rulesButton').classList.remove('move-left');
    document.getElementById('rulesButton').classList.add('fixed-right');
    document.getElementById('rulesButton').style.display = 'inline-block';
}

document.querySelectorAll('.choice-img').forEach(img => {
    img.addEventListener('click', () => {
        const playerChoice = img.alt.toLowerCase();
        playGame(playerChoice);
    });
});

window.onload = function() {
        document.querySelector('#DivComputerScore h1').textContent = computerScore;
    document.querySelector('#DivYourScore h1').textContent = playerScore;    
}
