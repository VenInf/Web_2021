const fs = require('fs')
const path = require("path");
const paintingsPath = '../../jsons/paintings.json'
const paintingsFromFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, paintingsPath)))

function getPainting(id)
{
    let chosenPainting = null;
    paintingsFromFile.paintings.forEach(painting =>{
        if (painting.id === id)
            chosenPainting = painting;
        });
    return chosenPainting;
}

function getAvaliablePaintings()
{
    var mas = paintingsFromFile.paintings;
    var filtered = mas.filter( 
            painting => painting.active === 'true'
        );
    return {paintings : filtered};
}

function maxFreeID()
{
    let id = 1;
    paintingsFromFile.paintings.forEach(painting => {
        if (id == painting.id)
            id += 1;
    });
    return id;    
}

function addPainting(query)
{
    let id = maxFreeID();
    paintingsFromFile.paintings.push(
        {
        id,
        title: query.title,
        author: query.author,
        description: query.description,
        image: query.image,
        startPrice: query.startPrice,
        minBetStep: query.minBetStep,
        maxBetStep: query.maxBetStep
    });
}

function removePainting (id)
{
    for (const key in paintingsFromFile.paintings) {
        if (paintingsFromFile.paintings[key].id === parseInt(id))
        {
            paintingsFromFile.paintings.splice(key, 1);
        }
    }
}

function editPainting (query)
{
    paintingsFromFile.paintings.forEach(painting => {
        if (painting.id === parseInt(query.id))
        {
            if (query.title !== undefined)
                painting.title = query.title;
            if (query.author !== undefined)
                painting.author = query.author;
            if (query.description !== undefined)
                painting.description = query.description;
            if (query.image !== undefined)
                painting.image = query.image;        
            if (query.startPrice !== undefined)
                painting.startPrice = query.startPrice; 
            if (query.minBetStep !== undefined)
                painting.minBetStep = query.minBetStep; 
            if (query.maxBetStep !== undefined)
                painting.maxBetStep = query.maxBetStep; 
            }
    });
}

function activate (id)
{
    paintingsFromFile.paintings.forEach(painting => {
        if (painting.id === parseInt(id))
        {
            painting.active = 'true';
        }
    });
} 

function deactivate (id)
{
    paintingsFromFile.paintings.forEach(painting => {
        if (painting.id === parseInt(id))
        {
            painting.active = 'false';
        }
    });    
}

function activateAll()
{
    paintingsFromFile.paintings.forEach(painting => {
        painting.active = 'true';
    });   
}

module.exports = 
{
    getPainting,
    getAvaliablePaintings,
    addPainting,
    removePainting,
    editPainting,
    activate,
    deactivate,
    activateAll,
    paintingsFromFile
}
