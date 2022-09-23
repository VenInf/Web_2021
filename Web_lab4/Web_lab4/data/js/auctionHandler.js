const paintStorFunc = require("./storageFunctions/paintingStorageFunctions");
const partStorFunc = require("./storageFunctions/participantsStorageFunctions");
const auctStorFunc = require("./storageFunctions/auctionStorageFunctions");

const avaliablePaintings = paintStorFunc.getAvaliablePaintings().paintings;

var betsAreAllowed = false, auctionIsRunning = false;
var currentWinner = undefined, currentBet = 0;
var trades = {};

function setTimer(s) {
    return new Promise((resolve) => setTimeout(resolve, Number.parseInt(s) * 1000))
}

function runAtDate(date, func)
{
    const currentDate = new Date()
    const diff = date - Date.parse(currentDate)
    if (diff > 0x7fffffff) {
        setTimeout(() => {
            runAtDate(date, func)
        }, 0x7fffffff)
    } else {
        setTimeout(func, diff)
    }
}

function checkAndRunAuction(io)
{
    var date = auctStorFunc.auctionFromFile.auction.dateTime;
    var currentDate = Date();
 
    var diff = Date.parse(date) - Date.parse(currentDate);

    if (auctionIsRunning == false)
    {
        if (diff > 0)
        {
            console.log("Call trade with delay", diff);
            runAtDate(Date.parse(date), () =>
                {trade(io).catch((e) => {
                console.log(e)})});
        }
        else
        {
            console.log("Call trage");
            trade(io);
        }
    }
}

function setupIO(server)
{
    io = require('socket.io')(server)

    io.on('connection', (socket) => { 
        console.log('user connected');
        checkAndRunAuction(io);
        
        socket.on('submitBet', (msg) => {
            console.log('submitBet: ' + msg);
            var betObj = JSON.parse(msg)
            handleBet(parseInt(betObj.id), parseInt(betObj.bet), socket);
        });
    
        socket.on('refreshAuction', (msg) => {
            var msgObj = JSON.parse(msg);
            updateAuctionData(parseInt(msgObj.id), socket);
        });
    });
}

function display(message, io)
{
    io.emit('displayMessage', message);
    console.log("displaying:", message);
}

function updateAuctionData(participantID, socket)
{
    const participant = partStorFunc.getParticipant(participantID)
    var data = {
        "timeOfAuction" : auctStorFunc.auctionFromFile.auction.dateTime,
        "balance" : participant.balance,
        "paintingsNames" : partStorFunc.getPaintingsNames(participantID).join(", "),
        "title" : trades.title,
        "price" : trades.price,
        "minBetStep" : trades.minBetStep,
        "maxBetStep" : trades.maxBetStep,
        "currentBet" : currentBet,
        "currentWinner" : currentWinner
    };
    socket.emit('update', JSON.stringify(data))
}

function handleBet(participantID, bet, socket)
{
    const participant = partStorFunc.getParticipant(participantID)
    if (participant == null) {
        display("User is not found", io);
        return
    }

    display("Bet request from " + participant.name + ", " + bet, io);

    if (
        participant.balance >= bet &&
        bet > currentBet &&
        betsAreAllowed &&
        bet - currentBet >= trades.minBetStep &&
        bet - currentBet <= trades.maxBetStep &&
        bet > trades.price
    ) {
        display("Bet is accepted", io)
        currentBet = bet
        currentWinner = participant
    } else if (participant.balance < bet) display('Insufficient funds', io)
    else if (!betsAreAllowed) display('Bets hasn\'t been allowed', io)
    else if (bet - currentBet < trades.minBetStep) display(`Minimum step ${trades.minBetStep} not reached`, io)
    else if (bet - currentBet > trades.maxBetStep) display(`Maximal step ${trades.maxBetStep} exceeded`, io)
    else if (bet <= trades.price) display('Bet is less than minimal cost', io)
    else display('Bet is rejected', io)
}

function handleWin(painting, io)
{
    if (currentWinner)
    {
        display("Winner has been decided", io);
        partStorFunc.subtractParticipantBalance(currentWinner.id, currentBet);
        partStorFunc.addPaintingToParticipant(currentWinner.id, painting.id)
    }
    else
    {
        display("There is no winner", io);
    }
    currentBet = 0;
    currentWinner = undefined;
}

async function trade(io)
{
    auctionIsRunning = true;
    display("Auction has started", io);
    for (const painting of avaliablePaintings)
    {
        currentWinner = undefined
        currentBet = painting.startPrice;

        trades = {
            title: painting.title,
            price: painting.startPrice,
            minBetStep: painting.minBetStep,
            maxBetStep: painting.maxBetStep
        }

        display("Current painting is " + painting.title, io);

        display("Now bets are allowed", io);
        betsAreAllowed = true
        display(`Time on bets is ${auctStorFunc.auctionFromFile.auction.timeLeft} seconds`, io)
        await setTimer(auctStorFunc.auctionFromFile.auction.timeLeft)
        display("Time is up", io);
        display("Now bets are not allowed", io);
        betsAreAllowed = false
        
        handleWin(painting, io)
        display(`Pause between rounds is ${auctStorFunc.auctionFromFile.auction.pause} seconds`, io)
        await setTimer(auctStorFunc.auctionFromFile.auction.pause)
    }
    trades = {
        title: "",
        price: "",
        minBetStep: "",
        maxBetStep: ""
    }

    display("There is no paintings left", io);
    display("End of the auction", io);
    auctionIsRunning = false;
}


module.exports = 
{
    setupIO
}