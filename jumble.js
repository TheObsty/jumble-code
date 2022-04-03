const greetMessage = document.querySelector('.title')
const messageLabel = document.querySelector('.start');
const guessWord = document.querySelector('input');
const scoreHeader = document.querySelector('h3');
const startButton = document.querySelector('.btn');
const stopButton = document.querySelector('.btn2');
const score = document.querySelector('.score1');
score.innerHTML = 0;

let game = false;
let highScore = localStorage.getItem('highScore', 0);
let defaultScore = 0;
let newWord = "";
let randomWord = "";
stopButton.addEventListener('click', endGame);
startButton.addEventListener('click', startGame);

const wordBank = ['apple', 'ball', 'cat', 'dog'];

const createWord = () => {
    let number = Math.floor(Math.random() * wordBank.length);
    let random = wordBank[number];
    console.log(random.split(""));
    return random;
}

const jumbleWord = (el) => {
    for (let i = el.length - 1; i >= 0; i--) {
        let temp = el[i];
        let j = Math.floor(Math.random() * (i + 1));
        el[i] = el[j];
        el[j] = temp;
    }
    return el.join("");
}

function gameMenu() {
    greetMessage.style.display = "block";
    stopButton.style.display = "none";
    guessWord.style.display = "none";
    messageLabel.style.display = "none";
}

function gameCheck() {
    if (game == true) {
        greetMessage.style.display = "none";
        guessWord.style.display = "block";
        scoreHeader.style.display = 'block';
        score.style.display = 'block';
        stopButton.style.display = "block";
    } else {
        greetMessage.style.display = "none";
        guessWord.style.display = "none";
        if (guessWord.value == newWord) {
            messageLabel.innerHTML = `Awesome ! It's Correct.\nIt is ${newWord}`;
            startButton.textContent = "Next word";
            defaultScore += 1;
            console.log(defaultScore);
            score.innerHTML = defaultScore;
            guessWord.value = "";
        } else {
            messageLabel.innerHTML = `Better luck next time, buddy!\nThe word was ${newWord}`;
            startButton.textContent = "Try again ?";
            console.log(defaultScore);
            gameHighScore();
        }
    }
}

function startGame() {
    if (!game) {
        game = true;
        startButton.textContent = "Guess !!";
        gameCheck();
        newWord = createWord();
        randomWord = jumbleWord(newWord.split(""));
        console.log(randomWord);
        messageLabel.style.display = "block";
        messageLabel.innerHTML = 'Guess the word : \"' + randomWord + '\"'
    }
    else if (guessWord.value == newWord) {
        game = false;
        gameCheck();
    } else {
        game = false;
        console.log("Wrong")
        console.log(defaultScore);
        gameCheck();
        gameHighScore();
    }
}

function endGame() {
    game = false;
    gameHighScore();
    gameMenu();
}

function gameHighScore() {
    if (highScore !== null) {
        if (defaultScore > highScore) {
            localStorage.setItem("highScore", defaultScore);
            scoreHeader.innerHTML = "High score"
            score.innerHTML = highScore;
        } else {
            localStorage.setItem("highScore", defaultScore);
        }
    }
}

window.onload = function () {
    gameMenu();
}   
