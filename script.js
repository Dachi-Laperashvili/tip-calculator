'use strict';

// element selecting

const bill = document.getElementById('bill');
const people = document.getElementById('people');
const tipBtn = document.querySelectorAll('.tip-btn');
const custom = document.getElementById('custom');
const tip = document.getElementById('tip-result');
const total = document.getElementById('total-result');
const reset = document.getElementById('reset');
const error = document.getElementById('error');
const error2 = document.getElementById('error2');

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

  // reseting styles
  error.style.display = 'none';
  error2.style.display = 'none';
  people.style.border = 'solid 2px transparent';
  bill.style.border = 'solid 2px transparent';
  reset.style.backgroundColor = 'hsl(181, 100%, 21%)';
  reset.style.color = 'hsl(183, 100%, 19%)';
};
init();

// function to check if values are 0 or if calculator is in active state
const checkValue = function () {
  if (
    people.value !== 0 &&
    people.value !== '' &&
    bill.value !== 0 &&
    bill.value !== ''
  ) {
    active = true;
  }

  // checking if number of people value is smaller than zero or empty string
  if (people.value <= 0 || people.value === '') {
    error.style.display = 'block';
    error.textContent = "Can't be zero";
    people.style.border = 'solid 3px rgb(230, 65, 65)';
    active = false;
  } else {
    error.style.display = 'none';
    people.style.border = 'solid 2px transparent';
    active = true;
  }

  // checking if bill value is smaller than zero or empty string
  if (bill.value <= 0 || bill.value === '') {
    error2.style.display = 'block';
    error2.textContent = "Can't be zero";
    bill.style.border = 'solid 3px rgb(230, 65, 65)';
    active = false;
  } else {
    error2.style.display = 'none';
    bill.style.border = 'solid 2px transparent';
    active = true;
  }
};

// function to calculate tip and total amount
const calculateTip = function (percentage) {
  let perPerson = bill.value / people.value;
  let tipAmount = perPerson * (percentage / 100);
  let totalAmount = perPerson + tipAmount;

  tip.textContent = '$' + tipAmount.toFixed(2);
  total.textContent = '$' + totalAmount.toFixed(2);

  error.style.display = 'none';
  error2.style.display = 'none';
  people.style.border = 'solid 2px transparent';
  bill.style.border = 'solid 2px transparent';
  active = false;
};
// looping through every tip button and giving it functionality

for (let i = 0; i < tipBtn.length; i++) {
  // functionality to tip buttons
  const tipFun = function () {
    checkValue();
    if (active) {
      tipBtn[i].focus();
      let percentage = parseFloat(tipBtn[i].value);
      calculateTip(percentage);
      reset.style.backgroundColor = 'hsl(172, 67%, 45%)';
    }
  };

  // inputing tip functionality
  tipBtn[i].addEventListener('click', tipFun);
  bill.addEventListener('click', tipFun);
  people.addEventListener('change', tipFun);
}

// functionality to custom button
const customFunction = function () {
  if (custom.value !== '') {
    percentage = parseFloat(custom.value);
    calculateTip(percentage);
    reset.style.backgroundColor = 'hsl(172, 67%, 45%)';
  }
};
// inputing custom functionality
custom.addEventListener('change', customFunction);
bill.addEventListener('change', customFunction);
people.addEventListener('change', customFunction);

// functionality to reset button
reset.addEventListener('click', init);

// checking if calculator is active
bill.addEventListener('change', checkValue);
people.addEventListener('change', checkValue);
