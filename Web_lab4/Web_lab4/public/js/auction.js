function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });
  return indexed_array;
}

function getTimeDifference(first, second) {
  const d = 60 * 60 * 24;
  const h = 60 * 60;
  const m = 60;
  let difference = (first - second) / 1000;
  let days = parseInt(difference / d);
  if (days < 1) days = 0;
  let hours = parseInt((difference - d * days) / h);
  if (hours < 1) hours = 0;
  let minutes = parseInt((difference - d * days - hours * h) / m);
  if (minutes < 1) minutes = 0;
  let seconds = parseInt(difference - d * days - hours * h - minutes * m);
  if (seconds < 1) seconds = 0;
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function timeDifferenceToText(difference) {
  return `Days ${difference.days}, hours ${difference.hours}, minutes ${difference.minutes}, seconds ${difference.seconds}`;
}

function updatePage(update) {
  var date = Date();
  var currentDate = Date.parse(date);
  var auctionDate = Date.parse(update.timeOfAuction);
  var timeDifference = getTimeDifference(auctionDate, currentDate);
  var textTimeDifference = timeDifferenceToText(timeDifference);
  $("#timeCell").text(textTimeDifference);
  $("#balanceCell").text(update.balance);
  $("#paintingsNamesCell").text(update.paintingsNames);
  $("#titleCell").text(update.title);
  $("#priceCell").text(update.price);
  $("#minBetStepCell").text(update.minBetStep);
  $("#maxBetStepCell").text(update.maxBetStep);
  $("#currentPriceCell").text(update.currentBet);

  if (update.currentWinner !== undefined) {
    $("#currentWinnerCell").text(update.currentWinner.name);
  } else {
    $("#currentWinnerCell").text("There is no winner right now");
  }
}

function requestUpdate() {
  var data = {
    "id": window.sessionStorage["id"]
  };
  session.emit('refreshAuction', JSON.stringify(data));
}

function displayMessage(string, color = undefined) {
  const elem = '<p>' + string + '</p>';
  if (color) elem.css('color', color);
  $("#bettingCell").append(elem);
}

var session = io();
$(document).ready(() => {
  $("#informationTable").draggable();
  session.on('update', msg => {
    console.log('receved update: ' + msg);
    var updObj = JSON.parse(msg);
    updatePage(updObj);
  });
  session.on('displayMessage', msg => {
    console.log('receved message: ' + msg);
    displayMessage(msg);
  });
  $("#submitBetButton").on("click", event => {
    $('#betID').val(window.sessionStorage["id"]);
    var $form = $("#makeBet");
    var data = getFormData($form);
    session.emit('submitBet', JSON.stringify(data));
  });
  setInterval(function () {
    requestUpdate();
  }, 1000);
});