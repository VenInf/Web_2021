const avaliableCheck = document.getElementById('avaliableCheck')
const filterButton = document.getElementById('filterButton')
filterButton.onclick = updateTable;

function toQuery (obj) {
    const str = [];
    for (const objKey in obj) {
        if (obj.hasOwnProperty(objKey))
            str.push(encodeURIComponent(objKey) + '=' + encodeURIComponent(obj[objKey]));
    }
    return str.join('&');
}

function updateTable ()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            document.getElementById('booksTable').innerHTML = this.responseText;
        }
    }
    const query = {
        avaliable: avaliableCheck.checked ? true : ''
    }
    xhttp.open('GET', '/library?' + toQuery(query), true);
    xhttp.send();
}