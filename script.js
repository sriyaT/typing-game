const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for game
let words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'population',
  'mountain',
  'india',
  'adventure',
];

// //fetch random word from api and display it
// fetch('https://random-word-api.herokuapp.com/word?number=20')
//   .then((res) => res.json())
//   .then((data) => {
//     words = data;
//     randomWord = words[Math.floor(Math.random() * words.length)];
//     displayWord();
//   });

//   function displayWord() {
//   wordEl.innerHTML = `
//     ${selectedWord
//       .split('')
//       .map(
//         (letter) => `
//         <span class = "letter" onclick = "openKeyboard()" >
//         ${correctLetters.includes(letter) ? letter : ''}
//         </span>
//         `
//       )
//       .join('')}
// `;

//initialize word
let randomWord;

//Init Score
let score = 0;

//Init Time
let time = 10;

//Focus on text onStart
text.focus();

//Set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//Start Counting Down
const timeInterval = setInterval(updateTime, 1000);

//generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//Add word to dom
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time == 0) {
    clearInterval(timeInterval);
    //endGame
    gameOver();
  }
}

//Game Over Show in the screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out!<h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = 'flex';
}

addWordToDom();

//event listener

//typing
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();

    updateScore();

    //clear
    e.target.value = '';

    if (difficulty === hard) {
      time += 1;
    } else if (difficulty === medium) {
      time += 2;
    } else {
      time += 3;
    }

    updateTime();
  }
});

//Settings
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
