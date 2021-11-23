const fs = require('fs')
const paintingsPath = './jsons/paintings.json'
const paintingsFromFile = JSON.parse(fs.readFileSync(paintingsPath))

function getPainting(id)
{
    let chosenPainting = null;
    paintingsFromFile.paintings.forEach(painting =>{
        if (painting.id === id)
            chosenPainting = painting;
        });
    return chosenPainting;
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

function addPainting(req)
{
    let id = maxFreeID();
    paintingsFromFile.paintings.push(
        {
        id,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        image: req.body.image,
        startPrice: req.body.startPrice,
        minBetStep: req.body.minBetStep,
        maxBetStep: req.body.maxBetStep
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

function editPainting (id, req)
{
    paintingsFromFile.paintings.forEach(painting => {
        if (painting.id === parseInt(id))
        {
            if (req.body.title !== undefined)
                painting.title = req.body.title;
            if (req.body.author !== undefined)
                painting.author = req.body.author;
            if (req.body.description !== undefined)
                painting.description = req.body.description;
            if (req.body.image !== undefined)
                painting.image = req.body.image;        
            if (req.body.startPrice !== undefined)
                painting.startPrice = req.body.startPrice; 
            if (req.body.minBetStep !== undefined)
                painting.minBetStep = req.body.minBetStep; 
            if (req.body.maxBetStep !== undefined)
                painting.maxBetStep = req.body.maxBetStep; 
            }
    });
}

function switchActivityPainting (id)
{
    paintingsFromFile.paintings.forEach(painting => {
        if (painting.id === parseInt(id))
        {
            if (painting.active === 'true')
            {
                painting.active = 'false';
            }
            else
            {
                painting.active = 'true';
            }
        }
    });
}



module.exports = 
{
    getPainting,
    addPainting,
    removePainting,
    editPainting,
    switchActivityPainting,
    paintingsFromFile
}