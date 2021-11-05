import {gameScreen, currentFig, gameover} from "./entryPoint.js";

function keyUpPresed()
{
    let temp = JSON.parse(JSON.stringify(currentFig));
    temp.bouns =  currentFig.bouns.map((row, i) => row.map((val, j) => currentFig.bouns[(currentFig.bouns.length - 1) - j][i]));
    if(gameScreen.canPlace(temp)) {
        gameScreen.deleteOldFig(currentFig);
        currentFig.bouns = temp.bouns;
        gameScreen.draw(currentFig);
    }    
}

function keyPresed(x)
{
    let temp = JSON.parse(JSON.stringify(currentFig));

    temp.cords.x += x;
    if(gameScreen.canPlace(temp))
    {
        gameScreen.deleteOldFig(currentFig);
        currentFig.cords.x += x;
        gameScreen.draw(currentFig);
    }
}


let timer;
timer = setTimeout(()=>(timer = clearTimeout(timer)), 300);

function throwFig(){
    let canplace = true;

    if(!timer &&!gameover)
    {
        while(canplace)
        {
            if(!gameScreen.canPlace(currentFig))
            {
                gameScreen.addFigure(currentFig);
                gameScreen.refreshMap();
                canplace = false;
            }
            else
            {
                currentFig.cords.y += 1;
            }

            timer = setTimeout(()=>(timer = clearTimeout(timer)), 400);
        }
    }
}

document.addEventListener("keydown", function (event)
{
    switch (event.which)
    {
        case 40:
            throwFig();
            break;
        case 37:
            keyPresed(-1);
            break;
        case 39:
            keyPresed(1);
            break;
        case 38: 
            keyUpPresed();
            break;
        case 32:
            throwFig();
            break;
        default:
            break;
    }
});