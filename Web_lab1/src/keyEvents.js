import {gameScreen, currentFig, animation} from "./entryPoint.js";

function keyUpCase()
{
    let fig = JSON.parse(JSON.stringify(currentFig));
    fig.matrix =  currentFig.matrix.map((row, i) => row.map((val, j) => currentFig.matrix[(currentFig.matrix.length - 1) - j][i]));
    if(gameScreen.canPlace(fig))
    {
        gameScreen.deleteOldFig(currentFig);
        currentFig.matrix = fig.matrix;
        gameScreen.draw(currentFig);
    }    
}

function keyLeftCase()
{
    let tmp = JSON.parse(JSON.stringify(currentFig));
    tmp.cords.x -= 1;
    if(gameScreen.canPlace(tmp))
    {
        gameScreen.deleteOldFig(currentFig);
        currentFig.cords.x -= 1;
        gameScreen.draw(currentFig);
    }    
}
function keyRightCase()
{
    let tmp = JSON.parse(JSON.stringify(currentFig));
    tmp.cords.x += 1;
    if(gameScreen.canPlace(tmp))
    {
        gameScreen.deleteOldFig(currentFig);
        currentFig.cords.x += 1;
        gameScreen.draw(currentFig);
    }    
}

let timeout;
timeout = setTimeout(()=>(timeout = clearTimeout(timeout)), 300);

function keyDownCase()
{
    if(!timeout && animation)
    {
        while(gameScreen.canPlace(currentFig))
        {
            currentFig.cords.y += 1;
            timeout = setTimeout(()=>(timeout = clearTimeout(timeout)), 400);
        }
        gameScreen.addFigure(currentFig);
        gameScreen.refreshMap();
    }
}

document.addEventListener("keydown", function (event)
{
    switch (event.which)
    {
        case 40:
            keyDownCase();
            break;
        case 37:
            keyLeftCase();
            break;
        case 39:
            keyRightCase();
            break;
        case 38: 
            keyUpCase();
            break;
        case 32:
            throwFig();
            break;
        default:
            break;
    }
});