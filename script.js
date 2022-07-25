'use strict';

const bill = document.getElementById('bill');
const people = document.getElementById('people');
const tipBtn = document.querySelectorAll('.tip-btn');
const custom = document.getElementById('custom');
const tip = document.getElementById('tip-result');
const total = document.getElementById('total-result');
const reset = document.getElementById('reset');

let percentage;
const init = () => {
  bill.value = 0;
  custom.value = '';
  people.value = 0;
  tip.textContent = '$0.00';
  total.textContent = '$0.00';
};
init();

const calculateTip = function (percentage) {
  let perPerson = bill.value / people.value;
  let tipAmount = perPerson * (percentage / 100);
  let totalAmount = perPerson + tipAmount;

  tip.textContent = '$' + tipAmount;
  total.textContent = '$' + totalAmount;
};

for (let i = 0; i < tipBtn.length; i++) {
  tipBtn[i].addEventListener('click', function () {
    let percentage = tipBtn[i].value;
    calculateTip(percentage);
  });
}
reset.addEventListener('click', init);
