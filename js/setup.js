'use strict';

(function () {
  var popupCoat = window.dialog.popup.querySelector('.wizard-coat');
  var popupCoatInput = window.dialog.popup.querySelector('input[name="coat-color"]');
  var popupEyes = window.dialog.popup.querySelector('.wizard-eyes');
  var popupEyesInput = window.dialog.popup.querySelector('input[name="eyes-color"]');
  var popupFireball = window.dialog.popup.querySelector('.setup-fireball-wrap');
  var popupFireballInput = window.dialog.popup.querySelector('input[name="fireball-color"]');

  var getRandomData = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  var changeElementColor = function (element, input, color, isBackgroundColor) {
    if (isBackgroundColor) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    input.value = color;
  };

  popupCoat.addEventListener('click', function () {
    changeElementColor(popupCoat, popupCoatInput, getRandomData(window.const.wizardCoatColors));
  });

  popupCoat.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupCoat, popupCoatInput, getRandomData(window.const.wizardCoatColors));
    }
  });

  popupEyes.addEventListener('click', function () {
    changeElementColor(popupEyes, popupEyesInput, getRandomData(window.const.wizardEyesColors));
  });

  popupEyes.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupEyes, popupEyesInput, getRandomData(window.const.wizardEyesColors));
    }
  });

  popupFireball.addEventListener('click', function () {
    changeElementColor(popupFireball, popupFireballInput, getRandomData(window.const.wizardFireballColors), true);
  });

  popupFireball.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupFireball, popupFireballInput, getRandomData(window.const.wizardFireballColors), true);
    }
  });

  var wizards = [];

  var onSuccessOccurs = function (data) {
    wizards = data;
    window.render(wizards);
  };

  var hideElement = function (element) {
    element.remove();
  };

  var onErrorOccurs = function (errorMessage) {
    var element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.zIndex = 100;
    element.style.margin = '0 auto';
    element.style.padding = '15px';
    element.style.fontSize = '30px';
    element.style.textAlign = 'center';
    element.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';

    element.textContent = errorMessage;
    var body = document.querySelector('body');
    body.insertAdjacentElement('afterbegin', element);

    setTimeout(hideElement, 5000, element);
  };

  var similarListContainer = document.querySelector('.setup-similar');
  similarListContainer.classList.remove('hidden');

  window.backend.load(onSuccessOccurs, onErrorOccurs);

  var popupForm = window.dialog.popup.querySelector('.setup-wizard-form');

  popupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(popupForm), window.dialog.close, onErrorOccurs);
    evt.preventDefault();
  });
})();
