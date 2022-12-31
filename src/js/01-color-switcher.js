const startRandomColor = document.querySelector('button[data-start]');
const stopRandomColor = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

stopRandomColor.disabled = true;
let intervalId = null;

const showRandomColor = {
  DELAY: 1000,

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },

  interval() {
    intervalId = setInterval(() => {
      changeRandomHexColor();
    }, this.DELAY);
    stopRandomColor.disabled = false;
  },
  start() {
    startRandomColor.addEventListener('click', () => {
      this.interval();
      startRandomColor.disabled = true;
      stopRandomColor.disabled = false;
    });
    stopRandomColor.addEventListener('click', this.stop);
  },

  stop() {
    clearInterval(intervalId);
    startRandomColor.disabled = false;
    stopRandomColor.disabled = true;
  },
};

function changeRandomHexColor() {
  bodyEl.style.backgroundColor = `${showRandomColor.getRandomHexColor()}`;
}

showRandomColor.start();

// startRandomColor.addEventListener('click', onStart);
// stopRandomColor.addEventListener('click', onStop);

// function onStart() {
//   startRandomColor.setAttribute('disabled', 'true');
//   stopRandomColor.removeAttribute('disabled');

//   setTimer = setInterval(() => {
//     document.body.style.background = getRandomHexColor();
//   }, 1000);
// }

// function onStop() {
//   startRandomColor.setAttribute('disabled', 'true');
//   stopRandomColor.removeAttribute('disabled');
//   clearInterval(setTimer);
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
