const startRandomColor = document.querySelector('button[data-start]');
const stopRandomColor = document.querySelector('button[data-stop]');

startRandomColor.addEventListener('click', onStart);
stopRandomColor.addEventListener('click', onStop);

function onStart() {
  startRandomColor.setAttribute('disabled', 'true');
  stopRandomColor.removeAttribute('disabled');

  setTimer = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onStop() {
  startRandomColor.setAttribute('disabled', 'true');
  stopRandomColor.removeAttribute('disabled');
  clearInterval(setTimer);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
