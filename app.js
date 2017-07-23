var builder = require('botbuilder');
var restify = require('restify');
var cognitiveservices=require('botbuilder-cognitiveservices');

// Setting up the Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4041, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var bot;
// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId:'ebcdbf82-5656-40c1-b2ea-83baa6e85d41',       //create your app id and app password log on to microsoft bot framework
    appPassword: 'AyvWigxY3fpMkrffPWcXonO'
});
server.post('/api/messages', connector.listen());




var DialogLabels = {
    Tracking_status:'Tracking_status',                                       //labels
    Information_about_the_price:'Information_about_the_price',
    Support:'Support'
};

var bot;

bot = new builder.UniversalBot(connector,[
 function (session) {

 builder.Prompts.text(session,"Hello Humans !! I am D-Fast :) Tell me your name?");       },    //waterfall mode
 function(session,result,next) {
 session.send("hello %s", result.response);
 next();
 },

 function(session,next,result) {
     builder.Prompts.choice(session,"Are you looking for --  1. Tracking the package   --  2. Info about the cost of shipping a package   --  3. Support(asking Queries like package lost/lost my tracking ID etc).         e.g.-- TYPE 1 or Tracking_status        ",[DialogLabels.Tracking_status,DialogLabels.Information_about_the_price,DialogLabels.Support],
 {
 maxRetries: 9,
 retryPrompt: 'Not a valid option :(.Please choose within given options above. For e.g.- Type 1 or Tracking-status for tracking info .okk :) '
 });},

    function (session, result) {
        if (!result.response) {
            //try so manyy
            session.send('You tried so many times dear customer:( But don\'t worry, I\'m here :)!');
            return session.endDialog();
        }

 var select=result.response.entity;
 switch (select) {
 case DialogLabels.Tracking_status:
 return session.beginDialog('Tracking_status');
 case DialogLabels.Support:
 return session.beginDialog('Support');
 case DialogLabels.Information_about_the_price:
     return session.beginDialog('Information_about_the_price');
 }}
    ]);





bot.dialog('Tracking_status',require('./Tracking'));

bot.dialog('Information_about_the_price',require('./Info'));





/**
 * Created by Shubham Jaiswal on 7/15/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices=require('botbuilder-cognitiveservices');
//var cognitiveservices = require('../../lib/botbuilder-cognitiveservices'






var recognizer=new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId:'deb8bda7-d7a9-4e33-95f8-351d6c5b48cf',
    subscriptionKey:'542f08ab1f2d4873aaeac72a3230a55b'});
var BasicQnAMakerDialog= new cognitiveservices.QnAMakerDialog(
    {
        recognizers:[recognizer],
        defaultMessage:'I did not get you.Please rephrase it',
        qnaThreshold:0.3
    });
bot.dialog('new',BasicQnAMakerDialog);

bot.dialog("Support",[function(session,result) {
    builder.Prompts.text(session,'Please ask me your queries?? ');
},

    function(session,result,next) {
        if (result.response != 'exit') {
            session.beginDialog('new');
        }
        else
        {
            session.endDialog("Byeee!!!");
        }},
    function(session) {
        //if (result.response != 'exit') {
            bot.dialog('new');
        }





]);






module.exports.bot=bot;
//var info=require('/info')



























