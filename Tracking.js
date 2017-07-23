
/**
 * Created by Shubham Jaiswal on 7/14/2017.
 */
var builder=require('botbuilder');
var tracking = require('dhl');
//var shippo = require('shippo')('shippo_live_213aa0409f0c52d0f0070cd8b0ed7a');
module.exports=[
    function(session,result,next) {
        builder.Prompts.text(session, "Please enter the tracking ID");
        next();
    }

    ,function(session,result,next) {
        session.send("Wait a sec looking for the status of %s ", result.response);
            session.dialogData.trackingid=result.response;
next();
    },

// searching from DHL package
function(session,result){
var packet = {
    "service": "dhl",
    "id": session.dialogData.trackingid
};

tracking.track(packet, function (tracking) {

    if (tracking.data.arrived === true) {
        session.send("arrived.........");
        session.endDialog('BYEEE!');
    } else {
        session.send("Oops!! not arrived yet :( .........");
        session.endDialog('BYEEE!');
    }
})}
]