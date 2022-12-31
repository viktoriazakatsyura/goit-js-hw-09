import Notiflix from 'notiflix';
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const flatpickr = require('flatpickr');

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] >= Date.now()) {
      refs.btnStart.removeAttribute('disabled');
      refs.btnStart.style.backgroundColor = 'green';
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.setAttribute('disabled', '');
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor(onTick) {
    this.intervslId = null;
    this.onTick = onTick;
  }
  start() {
    const targetDate = new Date(refs.input.value);
    refs.btnStart.setAttribute('disabled', '');
    refs.input.setAttribute('disabled', '');
    refs.btnStart.style.backgroundColor = 'red';

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const difference = targetDate - currentDate;
      const time = this.convertMs(difference);

      if (difference <= 1000) {
        clearInterval(this.intervalId);
      }
      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

const timer = new Timer(updateTimer);
refs.btnStart.addEventListener('click', timer.start.bind(timer));
