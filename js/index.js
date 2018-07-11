var newGameBtn = document.getElementById('newGameButton'); // zmienna dla przycisku 'new game'

newGameBtn.addEventListener('click', newGame); // aktywacja przycisku 'new game' poprzez kliknięcie

// tu próbuję stworzyć pętlę dla przycisków rock, paper, scissors...
var pickWeapon = document.querySelectorAll('.player-move'); //wybieram wszystkie elementy z klasą player-move
	for( var i = 0; i < pickWeapon.length; i++ ){ // zaczynam pętle, w której każę przejść przez każdy z tych obiektów
    pickWeapon[i].addEventListener('click', function(){ // wywołuję nasłuchiwanie - kliknięcie w przycisk ma wywołać wartość ze zmiennej playerChoice, pobraną z atrybutu data-move
    var playerChoice = event.target.getAttribute('data-move');
    });
  


pickRock.addEventListener('click', function() { 
	playerPick('rock') // uruchomienie funkcji odpowiedzialnej za wybór gracza w momencie naciśnięcia przycisku 'rock'
});
pickPaper.addEventListener('click', function() { 
	playerPick('paper') // jw.
});
pickScissors.addEventListener('click', function() {
	playerPick('scissors') // jw.
});

var gameState = 'notStarted' // zmienna, w której zdefiniownay jest stan gry przed rozpoczęciem
    player = {
        name: '', // miejsce na imię gracza wpisane w prompt
        score: 0 // miejsce na punktację gracza
    },
    computer = {
        score: 0 // miejsce na punktację komputera
    },
    rounds = {
      number: '' // miejsce na liczbę rund wpisaną w prompt
    };

var newGameElem = document.getElementById('newGameElement'), // zmienne zdefiniowane dla poszczególnych stanów gry - notstarted
	pickElem = document.getElementById('playerPickElement'), // started
	resultsElem = document.getElementById('resultsTableElement'); // ended

function setGameElements() { // funkcja, która odpowiada za wyświetlanie elementów w róznych fazach gry
	switch(gameState) {
		case 'started': // jeśli gra się zaczęła
				newGameElem.style.display = 'none'; // przycisk new game ma być niewidoczny
				pickElem.style.display = 'block'; // przyciski rock paper scissors i wyniki są widoczne
				resultsElem.style.display = 'block';
			break;
		case 'ended': // jeśli gra się skończyła
				newGameBtn.innerText = 'Once more'; // przycisk new game zmienia treść na once more
                playerPickElem.textContent = "Your choice";
                computerPickElem.textContent = "Computer's choice";
                playerResultElem.textContent = "Your score";
                computerResultElem.textContent = "Computer's score";
		case 'notStarted': // jeśli gra się nie rozpoczęła widac tylko przycisk new game
		default:
				newGameElem.style.display = 'block';
				pickElem.style.display = 'none';
				resultsElem.style.display = 'none';
	}
}

setGameElements();

var playerPointsElem = document.getElementById('playerPoints'), // zmienna w której zapisane są punkty gracza
    playerNameElem = document.getElementById('playerName'), // zmienna z imieniem gracza
    computerPointsElem = document.getElementById('computerPoints'); // zmienna z punktami komputera

function newGame() { // funkcja zawierająca w sobie to, co się stanie po kliknięciu w przycisk 'new game'
  rounds.number = prompt('How many rounds would you like to play?', 'Type number of rounds here'); // pojawia się okienko z pytaniem o liczbę rund
  if (isNaN(rounds.number)) {
    alert('Wrong value! Please type a number') // jesli odpowiedź nie jest liczbą pojawia się alert
    rounds.number = prompt('How many rounds would you like to play?', 'Type number of rounds here');
  }
  player.name = prompt('What is your name?', 'Player'); // kolejne okienko - tym razem z pytaniem o imię
  if (player.name) { // po podaniu imienia gra zmienia status na 'started'
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name; // wyświetla się imię gracza wpisane w okienko
    setGamePoints(); // funkcja, która aktualizuje wynik gry
  }

}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)]; // funkcja wyboru ruchu przez komputer - losowane są 3 liczby: 1. 2, 3 i każda z nich odpowiada jednej wartości - 'rock', 'paper' lub 'scissors'
}

var playerPickElem = document.getElementById('playerPick'),
    computerPickElem = document.getElementById('computerPick'),
    playerResultElem = document.getElementById('playerResult'),
    computerResultElem = document.getElementById('computerResult');

function playerPick(playerPick) { // wyświetlanie zmiennych z wynikami graczy w HTMLu
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) { // funkcja odpowiadająca za porównywanie wyniku gracza i komputera
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if (playerPick == computerPick) { // jeśli wybór gracza i komputera jest taki sam, mamy remis
        winnerIs = 'noone';
        playerResultElem.innerHTML = "It's a tie";
        computerResultElem.innerHTML = "It's a tie";
    } else if ( // zdefiniowane sytuacje, kiedy wygrywa komputer
    	(computerPick == 'rock' &&  playerPick == 'scissors') ||
    	(computerPick == 'scissors' &&  playerPick == 'paper') ||
    	(computerPick == 'paper' &&  playerPick == 'rock')) {

    	winnerIs = 'computer';
    }

    if (winnerIs == 'player') { // w każdej innej sytuacji wygrywa gracz
    	playerResultElem.innerHTML = "You won!";
    	player.score++; // dodanie punktu
    } else if (winnerIs == 'computer') {
    	computerResultElem.innerHTML = "Computer won!";
    	computer.score++;
    }

    setGamePoints();
    gameFinished();
}

function setGamePoints() { // funckcja, w której obliczne są wyniki gracza i komputera
    playerPointsElem.innerHTML = player.score; // punkty są zapisywane w HTMLu
    computerPointsElem.innerHTML = computer.score; // jw.
}

function gameFinished() { // funkcja kończąca grę po wskazanej przez gracza na początku liczbie rund - rounds.number
    if (player.score == rounds.number) {
        alert("You won! " + rounds.number + ' rounds! You won the game!')
        gameState = 'ended'
    } else if (computer.score == rounds.number) {
        alert("Computer won " + rounds.number + ' rounds! Computer won the game!')
        gameState = 'ended'
    }
    setGameElements();
}