function ifNotAdminCasePaintings() {
  $("#activateAllButton").hide();
}

$(document).ready(() => {
  if (window.sessionStorage["name"] != "admin") {
    ifNotAdminCasePaintings();
  }

  $("#activateAllButton").on("click", event => {
    $.post("/paintings", {
      activateAll: "true"
    });
  });
});