const initial = document.querySelector('.start');
const guess = document.querySelector('input');
const div = document.querySelector('h3');
const btn = document.querySelector('.btn');
const btn2 = document.querySelector('.btn2');
const score = document.querySelector('.score1');
score.innerHTML = 0;
let sc = 0;
let game = false;
let newV = "";
let randomV = "";

const words = ['apple',
    'ball',
    'cat',
    'dog',
    'elephant',
    'frog',
    'guitar',
    'house',
    'ice',
    'jacket',
    'karen',
    'lemon',
    'mango',
    'naughty',
    'oops'];

const createwords = () => {
    let number = Math.floor(Math.random() * words.length);
    let random = words[number];
    console.log(random.split(""));
    return random;
}

const jumbleword = (el) => {
    for (let i = el.length - 1; i >= 0; i--) {
        let temp = el[i];
        let j = Math.floor(Math.random() * (i + 1));
        el[i] = el[j];
        el[j] = temp;
    }
    return el.join("");
}

const gamemenu = () => {
    btn2.style.display = "none";
}

btn.addEventListener('click', function () {
    if (!game) {
        game = true;

        btn.textContent = "Guess !!";
        guess.style.display = "block";
        div.style.display = 'block';
        score.style.display = 'block';
        btn2.style.display = "block";
        newV = createwords();
        randomV = jumbleword(newV.split(""));
        console.log(randomV);
        initial.style.display = "block";
        initial.innerHTML = 'Guess the word \"' + randomV + '\"';

    } else {

        let inputword = guess.value;
        if (inputword == newV) {
            console.log('Correct');
            game = false;
            initial.style.display = "block";
            initial.innerHTML = `Awesome ! It's Correct.\nIt is ${newV}`;
            sc += 1;
            score.innerHTML = sc;
            console.log(sc);
            guess.style.display = "none";
            // guess.classList.toggle('hidden');
            btn.innerHTML = "Next word!";
            guess.value = "";

        } else {
            console.log('Incorrect');
            game = false;
            initial.style.display = "block";
            initial.innerHTML = `Better luck next time, buddy!\nThe word was ${newV}`;
            if (sc <= 0) {
                sc = 0;
                score.innerHTML = sc;
                console.log(sc);
            }
            else {
                sc -= 1
                score.innerHTML = sc;
                console.log(sc);
            }
            btn.innerHTML = "Play again !?"
            guess.style.display = "none";
            // guess.classList.toggle('hidden');
            guess.value = "";
        }

    }
})

btn2.addEventListener('click', function () {
    // window.location.reload();
    game = false;
    div.style.display = 'block';
    score.style.display = 'block';
    guess.style.display = 'none';
    initial.style.display = 'none';
    div.innerHTML = "High score"
    const hisc = sc;
    console.log(hisc);
    score.innerHTML = `${hisc}`;
    gamemenu();
})

window.onload = gamemenu;
