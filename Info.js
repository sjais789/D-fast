/**
 * Created by Shubham Jaiswal on 7/14/2017.
 */

var builder=require('botbuilder');
var DialogLabels={

    UnitedKingdom:'UnitedKingdom',
    Europe_EU:'Europe_EU',
    Europe_Non_EU:'Europe_Non_EU',
    Canada_or_USA_or_Mexico:'Canada_or_USA_or_Mexico',
    RestoftheWorld:'RestoftheWorld',
    Envelope1:'Envelope1',
    Box2:'Box2',
    Box3:'Box3',
    Box4:'Box4',
    Box5:'Box5',
    Box6:'Box6',
    Box7:'Box7',


}
module.exports=[

    function(session)
    {

        builder.Prompts.choice(session,"DHL provides shipping in more than 200 countries.Where do you want to ship? Select from the list",[DialogLabels.UnitedKingdom,DialogLabels.Europe_EU,DialogLabels.Europe_Non_EU,DialogLabels.Canada_or_USA_or_Mexico,DialogLabels.RestoftheWorld],{
        maxRetries: 9,
            retryPrompt: 'Not a valid option :( ,Please choose from the list. for e.g. 1 for UnitedKingdom or write full United Kingdom'
    });

    },
    function (session, results,next) {
        if (!results.response) {
            //try so manyy
            session.send('You tried so many times dear customer:( But don\'t worry, I\'m here :)!');
            return session.endDialog();

        }

        session.dialogData.a= results.response;
        next();
    },


    function(session,result)
{

 builder.Prompts.choice(session,"Please tell me type of the box you want",[DialogLabels.Envelope1,DialogLabels.Box2,DialogLabels.Box3,DialogLabels.Box4,DialogLabels.Box5,DialogLabels.Box6,DialogLabels.Box7],{
     maxRetries:6,
     retryPrompt:'choose something valid'})
 },
    function (session, results,next) {
        if (!results.response) {
            //tried so many times
            session.send('You tried so many times dear customer:( But don\'t worry, I\'m here :)!');
            return session.endDialog();
            session.dialogData.box = results.response;

        }
    next();
        },
    function(session,next)
    {

        var qqq;
        qqq = Math.floor((Math.random() * 100) + 1);

            session.send('£'+qqq+' including VAT');


    }

];











    ///

