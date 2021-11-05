let usesersArr = JSON.parse(localStorage.getItem('name'));
    usesersArr.sort((a, b) => b.score > a.score ? 1 : -1);

let tableSize = 10

for(let i in usesersArr)
{
    --tableSize
    if (tableSize == 0)
        break;
    var tableText = document.createTextNode( `${usesersArr[i].name} : ${usesersArr[i].score}`);
    var textTag = document.createElement("p");
    textTag.appendChild(tableText);
    var table = document.getElementById("table");
    table.appendChild(textTag);
}