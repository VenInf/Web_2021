function hideAllParticipantBlocks() {
  $("#addParticipantBlock").hide();
  $("#deleteParticipantBlock").hide();
  $("#changeParticipantBalanceBlock").hide();
}

function ifNotAdminCaseParticipants() {
  $("#addParticipantButton").hide();
  $("#deleteParticipantButton").hide();
  $("#changeParticipantBalanceButton").hide();
}

$(document).ready(() => {
  hideAllParticipantBlocks();

  if (window.sessionStorage["name"] != "admin") {
    ifNotAdminCaseParticipants();
  }

  $("#addParticipantButton").on("click", event => {
    $("#addParticipantBlock").toggle();
  });
  $("#submitAddParticipantButton").on("click", event => {
    $("#addParticipant").submit();
  });
  $("#deleteParticipantButton").on("click", event => {
    $("#deleteParticipantBlock").toggle();
  });
  $("#submitDeleteParticipantButton").on("click", event => {
    $("#deleteParticipant").submit();
  });
  $("#changeParticipantBalanceButton").on("click", event => {
    $("#changeParticipantBalanceBlock").toggle();
  });
  $("#submitDeleteParticipantButton").on("click", event => {
    $("#changeParticipantBalance").submit();
  });
});