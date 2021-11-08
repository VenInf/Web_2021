let usesersArr = JSON.parse(localStorage.getItem('name'));
    usesersArr.sort((a, b) => b.score > a.score ? 1 : -1);

let tableSize = 10

for(let user in usesersArr)
{
    if (tableSize-- == 0)
        break;
    var tableText = document.createTextNode( `${usesersArr[user].name} : ${usesersArr[user].score}`);
    var textTag = document.createElement("p");
    textTag.appendChild(tableText);
    var table = document.getElementById("table");
    table.appendChild(textTag);
}