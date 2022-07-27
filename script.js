'use strict';

const bill = document.getElementById('bill');
const people = document.getElementById('people');
const tipBtn = document.querySelectorAll('.tip-btn');
const custom = document.getElementById('custom');
const tip = document.getElementById('tip-result');
const total = document.getElementById('total-result');
const reset = document.getElementById('reset');
const error = document.getElementById('error');
const error2 = document.getElementById('error2');
let percentage;

const init = () => {
  bill.value = 0;
  custom.value = '';
  people.value = 0;
  tip.textContent = '$0.00';
  total.textContent = '$0.00';
  error.style.display = 'none';
  error2.style.display = 'none';
  people.style.border = 'solid 2px transparent';
  bill.style.border = 'solid 2px transparent';
};
init();

const calculateTip = function (percentage) {
  if (people.value >= 1 && bill.value >= 1) {
    error.style.display = 'none';
    error2.style.display = 'none';
    people.style.border = 'solid 2px transparent';
    bill.style.border = 'solid 2px transparent';

    let perPerson = bill.value / people.value;
    let tipAmount = perPerson * (percentage / 100);
    let totalAmount = perPerson + tipAmount;
    tip.textContent = '$' + tipAmount.toFixed(2);
    total.textContent = '$' + totalAmount.toFixed(2);
  }
  if (people.value <= 0 && bill.value <= 0) {
    error.style.display = 'block';
    error.innerHTML = "Can't be zero";
    error2.style.display = 'block';
    error2.innerHTML = "Can't be zero";
    bill.style.border = 'solid 3px rgb(230, 65, 65)';
    people.style.border = 'solid 3px rgb(230, 65, 65)';
  } else if (people.value <= 0) {
    error.style.display = 'block';
    error.innerHTML = "Can't be zero";
    people.style.border = 'solid 3px rgb(230, 65, 65)';
  } else if (bill.value <= 0) {
    error2.style.display = 'block';
    error2.innerHTML = "Can't be zero";
    bill.style.border = 'solid 3px rgb(230, 65, 65)';
  }
};

for (let i = 0; i < tipBtn.length; i++) {
  tipBtn[i].addEventListener('click', function () {
    let percentage = parseFloat(tipBtn[i].value);
    calculateTip(percentage);
  });
}

custom.addEventListener('change', function () {
  percentage = parseFloat(custom.value);
  calculateTip(percentage);
});
reset.addEventListener('click', init);
