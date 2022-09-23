function switchActivationButtonsVisibility() {
  if (localPainting.active == "true") {
    localPainting.active = "false";
  } else {
    localPainting.active = "true";
  }

  $("#activateButton").toggle();
  $("#deactivateButton").toggle();
}

function switchImageButtonsVisibility() {
  $("#showImageButton").toggle();
  $("#hideImageButton").toggle();
}

function ifNotAdminCasePainting() {
  $("#activateButton").hide();
  $("#deactivateButton").hide();
  $("#editPaintingButton").hide();
}

$(document).ready(() => {
  if (localPainting.active == "true") {
    $("#activateButton").hide();
  } else {
    $("#deactivateButton").hide();
  }

  $("#editPaintingBlock").hide();
  $("#showImageButton").show();
  $("#hideImageButton").hide();
  $("#image").hide();

  if (window.sessionStorage["name"] != "admin") {
    ifNotAdminCasePainting();
  }

  $("#activateButton").on("click", event => {
    $.post("/paintings", {
      id: localPainting.id,
      activate: "true"
    });
    switchActivationButtonsVisibility();
  });
  $("#deactivateButton").on("click", event => {
    $.post("/paintings", {
      id: localPainting.id,
      deactivate: "true"
    });
    switchActivationButtonsVisibility();
  });
  $("#editPaintingButton").on("click", event => {
    $("#editPaintingBlock").toggle();
  });
  $("#submitEditButton").on("click", event => {
    $("#submitEditButton").submit();
  });
  $("#hideImageButton").on("click", event => {
    switchImageButtonsVisibility();
    $("#image").toggle();
  });
  $("#showImageButton").on("click", event => {
    switchImageButtonsVisibility();
    $("#image").toggle();
  });
});