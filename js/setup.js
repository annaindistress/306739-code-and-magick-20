'use strict';

var WIZARD_AMOUNT = 4;

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var userDialog = document.querySelector('.setup');
var similarListContainer = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция получения случайных данных из массива

var getRandomData = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Функция генерации случайных данных

var getRandomWizards = function (amount) {
  var wizards = [];

  for (var i = 0; i < amount; i++) {
    wizards[i] = {
      name: Math.floor(Math.random() * 2) ? getRandomData(WIZARD_NAMES) + ' ' + getRandomData(WIZARD_SURNAMES) : getRandomData(WIZARD_SURNAMES) + ' ' + getRandomData(WIZARD_NAMES),
      coatColor: getRandomData(WIZARD_COAT_COLORS),
      eyesColor: getRandomData(WIZARD_EYES_COLORS)
    };
  }

  return wizards;
};

// Функция создания DOM-элемента на основе JS-объекта

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов

var renderWizardElements = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

// Показывает окно настройки

userDialog.classList.remove('hidden');

// Показывает блок со списком похожих персонажей

similarListContainer.classList.remove('hidden');

// Отрисовка похожих персонажей

renderWizardElements(getRandomWizards(WIZARD_AMOUNT));
