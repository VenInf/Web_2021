let userName = [{ name: "",
                 score: "0"}];

let userNameHead = userName[0]

function authorization()
{
    if(userNameHead.name) 
    {
        if(localStorage.getItem('name'))
        {
            let parsed = JSON.parse(localStorage.getItem('name'));
            parsed.push(userNameHead);
            localStorage.removeItem('name');
            localStorage.setItem('name', JSON.stringify(parsed));
        }
        else
        {
            localStorage.setItem('name', JSON.stringify(userName));
        }
        window.open('tetris','_self');
    }
}

function getName()
{
    userNameHead.name = document.getElementById("userNameInput").value;
}


document.getElementById("submitButton").addEventListener("click", authorization);
document.getElementById("userNameInput").addEventListener("change", getName);