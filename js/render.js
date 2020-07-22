'use strict';

(function () {
  var MAX_WIZARD_AMOUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var wizardsAmount = data.length > MAX_WIZARD_AMOUNT ? MAX_WIZARD_AMOUNT : data.length;

    similarListElement.innerHTML = '';

    for (var i = 0; i < wizardsAmount; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);
  };
})();
