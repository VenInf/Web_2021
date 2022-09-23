function hideAllAuctionBlocks()
{
    $("#changeDateTimeBlock").hide();
    $("#changePauseBlock").hide();
    $("#changeTimeLeftBlock").hide();
}

function ifNotAdminCaseAuction()
{
    $("#changeDateTimeButton").hide();
    $("#changePauseButton").hide();
    $("#changeTimeLeftButton").hide();
}

$(document).ready(()=>{
    hideAllAuctionBlocks();
    
    if (window.sessionStorage["name"] != "admin")
    {
        ifNotAdminCaseAuction();
    }

    $("#changeDateTimeButton").on("click", (event)=>{
        $("#changeDateTimeBlock").toggle();
    });
    $("#submitDateTimeButton").on("click", (event)=>{
        $("#submitDateTimeButton").submit();
    });
    
    $("#changePauseButton").on("click", (event)=>{
        $("#changePauseBlock").toggle();
    });
    $("#submitPauseButton").on("click", (event)=>{
        $("#submitPauseButton").submit();
    });
    
    $("#changeTimeLeftButton").on("click", (event)=>{
        $("#changeTimeLeftBlock").toggle();
    });
    $("#submitTimeLeftButton").on("click", (event)=>{
        $("#submitTimeLeftButton").submit();
    });
    
})