'use strict';

(function () {
  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

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

  var popupCoat = window.dialog.popup.querySelector('.wizard-coat');
  var popupCoatInput = window.dialog.popup.querySelector('input[name="coat-color"]');

  popupCoat.addEventListener('click', function () {
    var newColor = getRandomData(window.const.wizardCoatColors);
    changeElementColor(popupCoat, popupCoatInput, newColor);
    wizard.onCoatChange(newColor);
  });

  popupCoat.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      var newColor = getRandomData(window.const.wizardCoatColors);
      changeElementColor(popupCoat, popupCoatInput, newColor);
      wizard.onCoatChange(newColor);
    }
  });

  var popupEyes = window.dialog.popup.querySelector('.wizard-eyes');
  var popupEyesInput = window.dialog.popup.querySelector('input[name="eyes-color"]');

  popupEyes.addEventListener('click', function () {
    var newColor = getRandomData(window.const.wizardEyesColors);
    changeElementColor(popupEyes, popupEyesInput, newColor);
    wizard.onEyesChange(newColor);
  });

  popupEyes.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      var newColor = getRandomData(window.const.wizardEyesColors);
      changeElementColor(popupEyes, popupEyesInput, newColor);
      wizard.onEyesChange(newColor);
    }
  });

  var popupFireball = window.dialog.popup.querySelector('.setup-fireball-wrap');
  var popupFireballInput = window.dialog.popup.querySelector('input[name="fireball-color"]');

  popupFireball.addEventListener('click', function () {
    changeElementColor(popupFireball, popupFireballInput, getRandomData(window.const.wizardFireballColors), true);
  });

  popupFireball.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupFireball, popupFireballInput, getRandomData(window.const.wizardFireballColors), true);
    }
  });

  window.wizard = wizard;
})();
