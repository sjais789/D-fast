/**
 * Created by Shubham Jaiswal on 7/15/2017.
 */
var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices=require('botbuilder-cognitiveservices');
//var cognitiveservices = require('../../lib/botbuilder-cognitiveservices'



var recognizer=new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId:'YOUR ID',
    subscriptionKey:'YOUR KEY'});
var N= new cognitiveservices.QnAMakerDialog(
    {
        recognizers:[recognizer],
        defaultMessage:'I did not get you.Please rephrase it',
        qnaThreshold:0.3
    });































