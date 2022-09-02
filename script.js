'use strict';

// element selecting

const bill = document.getElementById('bill');
const people = document.getElementById('people');
const tipBtn = document.querySelectorAll('.tip-btn');
const custom = document.getElementById('custom');
const tip = document.getElementById('tip-result');
const total = document.getElementById('total-result');
const reset = document.getElementById('reset');
const error = document.querySelectorAll('.error');

// variables
let percentage, active;

// function to reset every value
const init = () => {
  // reseting elements value
  active = false;
  bill.value = '';
  custom.value = '';
  people.value = '';
  tip.textContent = '$0.00';
  total.textContent = '$0.00';
  for (let i = 0; i < error.length; i++) {
    error[i].textContent = '';
  }

  // reseting styles
  tipBtn.forEach(btn => btn.classList.remove('focused-btn'));
  bill.classList.remove('hidden');
  people.classList.remove('hidden');
  reset.style.backgroundColor = 'hsl(181, 100%, 21%)';
  reset.style.color = 'hsl(183, 100%, 19%)';
};
init();

// function to check if values are 0 or if calculator is in active state
const checkValue = function () {
  if (
    people.value !== '0' &&
    people.value !== '' &&
    bill.value !== '0' &&
    bill.value !== '' &&
    typeof percentage !== 'undefined'
  ) {
    active = true;
  }

  // checking if number of people value is smaller than zero or empty string
  if (people.value === '0' || people.value === '') {
    error[1].textContent = "Can't be zero";
    people.classList.add('hidden');
  } else {
    error[1].textContent = '';
    people.classList.remove('hidden');
  }

  // checking if bill value is smaller than zero or empty string
  if (bill.value === '0' || bill.value === '') {
    error[0].textContent = "Can't be zero";
    bill.classList.add('hidden');
  } else {
    error[0].textContent = '';
    bill.classList.remove('hidden');
  }

  if (active) {
    calculateTip(percentage);
    reset.style.backgroundColor = 'hsl(172, 67%, 45%)';
  }
};

// function to calculate tip and total amount
const calculateTip = function (percentage) {
  let perPerson = bill.value / people.value;
  let tipAmount = perPerson * (percentage / 100);
  let totalAmount = perPerson + tipAmount;

  tip.textContent = '$' + tipAmount.toFixed(2);
  total.textContent = '$' + totalAmount.toFixed(2);

  for (let i = 0; i < error.length; i++) {
    error[i].textContent = '';
  }
  bill.classList.remove('hidden');
  people.classList.remove('hidden');
  active = false;
};

// looping through every tip button and giving it functionality

for (let i = 0; i < tipBtn.length; i++) {
  // functionality to tip buttons
  tipBtn[i].addEventListener('click', function () {
    checkValue();
    tipBtn[i].classList.remove('focused-btn');
    percentage = parseFloat(tipBtn[i].value);
    calculateTip(percentage);
    for (let j = 0; j <= tipBtn.length; j++) {
      tipBtn[i].classList.add('focused-btn');
      tipBtn[j].classList.remove('focused-btn');
    }
  });
}

// functionality to custom button
const customFunction = function () {
  if (custom.value !== '') {
    checkValue();
    tipBtn.forEach(btn => btn.classList.remove('focused-btn'));
    percentage = parseFloat(custom.value);
    calculateTip(percentage);
  }
};
// inputing custom functionality
custom.addEventListener('change', customFunction);
custom.addEventListener('click', customFunction);
// functionality to reset button
reset.addEventListener('click', init);

// checking if calculator is active
bill.addEventListener('change', checkValue);
people.addEventListener('change', checkValue);
