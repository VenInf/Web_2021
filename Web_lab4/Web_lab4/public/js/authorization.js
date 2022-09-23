$(document).ready(() => {
  $("#submitAuthorizationButton").on("click", event => {
    window.sessionStorage.clear();
    console.log("clearing session storage");
  });
});