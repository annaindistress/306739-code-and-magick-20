'use strict';

// Константы

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 10;
var FONT_GAP = 20;
var BAR_HEIGHT_MAX = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

// Функция отрисовки облаков

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_GAP);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - CLOUD_GAP);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

// Функция отрисовки текста

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
};

// Функция отрисовки колонок

var renderBar = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

// Функция для получения синего, со случайной насыщенностью

var getRandomBlue = function () {
  var randomSaturation = Math.floor(Math.random() * 101);
  return 'hsl(240, ' + randomSaturation + '%, 50%)';
};

// Функция для получения самого большого числа из массива

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Функция отрисовки статистики

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + CLOUD_GAP + FONT_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + CLOUD_GAP + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barColor = getRandomBlue();

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    var barHeight = BAR_HEIGHT_MAX * times[i] / maxTime;

    renderText(ctx, names[i], CLOUD_X + BAR_GAP + CLOUD_GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    renderBar(ctx, CLOUD_X + BAR_GAP + CLOUD_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - barHeight, barHeight, barColor);
    renderText(ctx, Math.floor(times[i]), CLOUD_X + BAR_GAP + CLOUD_GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - CLOUD_GAP - barHeight);
  }
};
