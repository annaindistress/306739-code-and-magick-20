'use strict';

(function () {
  var popup = document.querySelector('.setup');
  var popupOpen = document.querySelector('.setup-open');
  var popupClose = popup.querySelector('.setup-close');
  var popupName = popup.querySelector('.setup-user-name');
  var popupCoat = popup.querySelector('.wizard-coat');
  var popupCoatInput = popup.querySelector('input[name="coat-color"]');
  var popupEyes = popup.querySelector('.wizard-eyes');
  var popupEyesInput = popup.querySelector('input[name="eyes-color"]');
  var popupFireball = popup.querySelector('.setup-fireball-wrap');
  var popupFireballInput = popup.querySelector('input[name="fireball-color"]');
  var popupHandle = popup.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && popupName !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function () {
    popup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    popup.removeAttribute('style');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var changeElementColor = function (element, input, color, isBackgroundColor) {
    if (isBackgroundColor) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    input.value = color;
  };

  popupOpen.addEventListener('click', function () {
    openPopup();
  });

  popupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });

  var getRandomData = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
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

  popupHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      popup.style.top = (popup.offsetTop - shift.y) + 'px';
      popup.style.left = (popup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          popupHandle.removeEventListener('click', onClickPreventDefault);
        };
        popupHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = {
    popup: popup,
    close: closePopup
  };
})();
