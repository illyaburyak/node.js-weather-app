const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#one');
const messageTwo = document.querySelector('#two');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = input.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = `${data.error}`;
      } else {
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = `${data.forecast}`;
      }
    });
  });
});
