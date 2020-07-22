'use strict';

(function () {
  var coatColor = window.const.wizardCoatColors[0];
  var eyesColor = window.const.wizardEyesColors[0];
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSuccessOccurs = function (data) {
    wizards = data;
    updateWizards();
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
