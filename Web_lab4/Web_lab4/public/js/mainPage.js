function addLocalStorageData(sessionStorageData) {
  if (sessionStorageData.sessionStorageName !== undefined) window.sessionStorage["name"] = sessionStorageData.sessionStorageName;
  if (sessionStorageData.sessionStorageID !== undefined) window.sessionStorage["id"] = sessionStorageData.sessionStorageID;
}

$(document).ready(() => {
  console.log("Adding session storage data", sessionStorageData);
  addLocalStorageData(sessionStorageData);
});