const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playButton = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

function playVideo() {
  (video.paused) ? video.play() : video.pause();
};

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  playButton.innerText = icon;
};

function skipVideo() {
  video.currentTime += parseFloat(this.dataset['skip']);
};

function rangeVideo() {
  video[this.name] = this.value;
};

function progressUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function videoScroll(event) {
  const scrollTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrollTime;
};

video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);  //also one called progress, for when video emits update time
playButton.addEventListener('click', playVideo);
skipButtons.forEach(button => button.addEventListener('click', skipVideo));
ranges.forEach(range => range.addEventListener('change', rangeVideo));
progress.addEventListener('click', videoScroll);
let mousedown = false;
progress.addEventListener('mousemove', (event) => mousedown && videoScroll(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


