const buttons = document.querySelectorAll('[data-time]');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let countdown;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000 );
    // console.log(secondsLeft)
    if (secondsLeft < 0) {
      clearInterval(countdown);
    };
    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  let remainder = seconds
  const hours = Math.floor(remainder / 3600);
  remainder = remainder % 3600;
  const minutes = Math.floor(remainder / 60);

  let remainderSeconds = remainder % 60;
  const adjustedSeconds = remainderSeconds < 10 ? '0' : '';
  const adjustedMinutes = minutes < 10 ? '0' : '';

  const display = `${hours}:${adjustedMinutes}${minutes}:${adjustedSeconds}${remainderSeconds}`;

  document.title = display;
  timerDisplay.innerText = display;
};

function displayEndTime(then) {
  const end = new Date(then);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTime.innerText = `End of Timer ${hour}:${minutes < 10 ? '0' : ''}${minutes}.`
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
})
