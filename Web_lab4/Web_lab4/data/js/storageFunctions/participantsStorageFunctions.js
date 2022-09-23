const fs = require('fs')
const path = require("path");
const participantsPath = '../../jsons/participants.json'
const participantsFromFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, participantsPath)))

const paintStorFunc = require("./paintingStorageFunctions");

function getParticipant(id)
{
    let chosenParticipant = null;
    participantsFromFile.participants.forEach(participant =>{
        if (participant.id === id)
            chosenParticipant = participant;
        });
    return chosenParticipant;
}

function getParticipantIDByName(name)
{
    let chosenParticipant = null;
    participantsFromFile.participants.forEach(participant =>{
        if (participant.name === name)
            chosenParticipant = participant;
        });
    return chosenParticipant.id;
}

function getPaintingsNames(id)
{
    var result = [];
    var participant = getParticipant(id);
    (participant.paintings).forEach(paintID => {
        result.push(paintStorFunc.getPainting(paintID).title);
    });

    return result;
}

function maxFreeID()
{
    let id = 1;
    participantsFromFile.participants.forEach(participant => {
        if (id == participant.id)
            id += 1;
    });
    return id;    
}

function addParticipant(query)
{
    let id = maxFreeID();
    participantsFromFile.participants.push(
        {
        id,
        name: query.name,
        balance: 0,
        paintigs: []
    });
}

function deleteParticipant (name = "")
{
    for (const key in participantsFromFile.participants)
    {
        if (participantsFromFile.participants[key].name === name)
        {
            participantsFromFile.participants.splice(key, 1);
        }

    }
}

function changeParticipantBalance (name = "", balance)
{
    for (const key in participantsFromFile.participants)
    {
        if (participantsFromFile.participants[key].name === name)
        {
            participantsFromFile.participants[key].balance = balance;
        }
    }
}

function subtractParticipantBalance(id, balanceChange)
{
    for (const key in participantsFromFile.participants)
    {
        if (participantsFromFile.participants[key].id === id)
        {
            participantsFromFile.participants[key].balance -= balanceChange;
        }
    }    
}

function isThereParticipant (name = "")
{
    for (const key in participantsFromFile.participants)
    {
        if (participantsFromFile.participants[key].name === name)
        {
            return true;
        }
    }
    return false;
}

function addPaintingToParticipant(partID, paintID)
{
    var paintingIsActive = false;
    for (const key in paintStorFunc.paintingsFromFile.paintings)
    {
        if (paintStorFunc.paintingsFromFile.paintings[key].id === paintID)
        {
            paintingIsActive = true;
            paintStorFunc.paintingsFromFile.paintings[key].active = "false";
        }
    }

    if (paintingIsActive == false)
    {
        return;
    }

    for (const key in participantsFromFile.participants)
    {
        if (participantsFromFile.participants[key].id === partID)
        {
            var list = participantsFromFile.participants[key].paintings;
            list.push(paintID);
            participantsFromFile.participants[key].paintings = list;
        }
    }
}

module.exports = 
{
    getParticipant,
    addParticipant,
    deleteParticipant,
    changeParticipantBalance,
    isThereParticipant,
    getParticipantIDByName,
    addPaintingToParticipant,
    getPaintingsNames,
    subtractParticipantBalance,
    participantsFromFile
}