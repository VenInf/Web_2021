import {TetrisMap} from "./tetrisMap.js";

import "./keyEvents.js"

let score = 0;
let users = JSON.parse(localStorage.getItem("name"));
let currentUsers = users[users.length -1];
document.getElementById("nameUsers").innerHTML = "Name: " + currentUsers.name;
document.getElementById("score").innerHTML = "Score: " + score;
document.getElementById("bestScore").innerHTML = "Best score: " + users[users.length -1].score;
const minCanvas = document.getElementById("nextFig");
const minContext = minCanvas.getContext('2d');

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');
export let animation = null;
let ticksInFrame = 30;

let tick = 0;

const nameFigure = ['I','S','T','Z','L','O','J'];
const colors = ["dimgrey", "cyan", "purple", "yellow", "forestgreen", "red", "blue", "orange"];

const figures = {
    'I': {
        matrix: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        cords: {y: -3, x: 3},
        color: colors[1]
    },
    'J': {
        matrix: [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0],
        ],
        cords: {y: -3, x: 3},
        color: colors[2]
    },
    'O': {
        matrix: [
            [3, 3],
            [3, 3]
        ],
        cords: {y: -2, x: 3},
        color: colors[3]
    },
    'L': {
        matrix: [
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4],
        ],
        cords: {y: -3, x: 3},
        color: colors[4]
    },
    'Z': {
        matrix: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ],
        cords: {y: -2, x: 3},
        color: colors[5]
    },
    'T': {
        matrix: [
            [0, 0, 0],
            [6, 6, 6],
            [0, 6, 0],
        ],
        cords: {y: -3, x: 3},
        color: colors[6]
    },
    'S': {
        matrix: [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ],
        cords: {y: -2, x: 3},
        color: colors[7]
    }
};

export const gameScreen = new TetrisMap(context, colors);
export let currentFig = {};
let nextFig ={};
let queueFig =[];

export function start()
{
    generateFigureQueue();
    currentFig = JSON.parse(JSON.stringify(figures[queueFig.pop()]));
    fillNextFigCanvas();
    mainLoop();
}


function generateFigureQueue()
{
    if(queueFig.length == 0)
    {
        let len = 10;
        let rand;
        for (let i=0; i<len; i++)
        {
            rand = Math.floor(Math.random() * 7);
            queueFig.push(nameFigure[rand]);
            --len;
        }
    }
}

function clearCanvas()
{
    minContext.fillStyle = colors[0];
    minContext.fillRect(0, 0, 128, 128);
}

function fillNextFigCanvas()
{
    nextFig = figures[queueFig[queueFig.length - 1]];
    for (let x = 0; x < nextFig.matrix.length; ++x)
    {
        for (let y = 0; y < nextFig.matrix[x].length; ++y)
        {
            if (nextFig.matrix[y][x])
            {
                minContext.fillStyle = nextFig.color;
                minContext.fillRect(x * 32, y * 32, 32 - 1, 32 - 1);
            }
        }
    }

}

function gameOver()
{
    cancelAnimationFrame(animation);
    animation = null;
    context.textAlign = 'center';
    context.fillStyle = 'black';

    context.font = "48px serif";
    context.textBaseline = 'middle';
    context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
}


function gameOverCheck()
{
    for(let x = 0; x < gameScreen.tetrisMap[0].length; ++x)
    {
        if(gameScreen.tetrisMap[0][x])
        {
            gameOver();
            break;
        };
    }
}

function bestScore()
{
    if(score > users[users.length -1].score)
    {
        users[users.length -1].score = score;
        localStorage.setItem('name',JSON.stringify(users));
        document.getElementById("bestScore").innerHTML = "Best score: " + users[users.length -1].score;
    }
}

function clearRow(row)
{
    for (let i = row; i >= 0; i--)
    {
        for (let j = 0; j < gameScreen.tetrisMap[i].length; j++)
        {
            gameScreen.tetrisMap[i][j] = gameScreen.tetrisMap[i-1][j];
        }
    }
}

function filledLineCheck()
{
    for(let row = gameScreen.tetrisMap.length -1;  row >= 0; row--)
    {
        let rowIsFilled = gameScreen.tetrisMap[row].every(elem => elem !== 0);
        if(rowIsFilled)
        {
            bestScore();
            document.getElementById("score").innerHTML = "Score: " + score;
            clearRow(row);
        }
    }
}

function fallingFigures()
{
    gameScreen.deleteOldFig(currentFig);
    currentFig.cords.y += 1;
    gameScreen.draw(currentFig);
}

function giveFigure()
{
    return JSON.parse(JSON.stringify(figures[queueFig.pop()]));
}

document.getElementById("restart").addEventListener("click", restartGame);
function restartGame()
{
    cancelAnimationFrame(animation);
    window.location.reload();
}


export function mainLoop()
{
    animation = requestAnimationFrame(mainLoop);

    ++tick;
    if(tick > ticksInFrame)
    {
        tick = 0;

        if(gameScreen.canPlace(currentFig))
        {
            fallingFigures();
        }
        else
        {
            gameScreen.addFigure(currentFig);
            filledLineCheck();
            gameScreen.refreshMap();
            gameOverCheck();

            currentFig = giveFigure();
            generateFigureQueue();
            clearCanvas();
            fillNextFigCanvas();
        }
    }

}

document.getElementById("aut").addEventListener("click", ()=>{history.go(-1)});
