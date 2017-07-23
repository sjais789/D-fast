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
var N= new cognitiveservices.QnAMakerDialog(
    {
        recognizers:[recognizer],
        defaultMessage:'I did not get you.Please rephrase it',
        qnaThreshold:0.3
    });































