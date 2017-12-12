const cards = require("../data/cards.js");
var _ = require('underscore');

var allcards = cards.getAllCards();

var userPoints = 20;
var aiPoints = 20;
var userCards = _.sample(allcards, 5);
var aiCards = _.sample(allcards, 5);


/* first person to reach 0 or lose cards
*/

let exportedMethods = {

    function passJSONObject(){
        var obj = {
            "AIHP": aiPoints,
            "userHP": userPoints,
            "cards" : userCards
        }
        return passJSONObject;
    },

    function isGameWon(){
        if(userPoints<=0 || aiPoints<=0){
            return true;
        }
        if(userCards==null || aiCards==null || userCards==[] || aiCards==[]){
            return true;
        }
        else{
            return false;
        }
    },

    function deductPoints(user, cardPicked){
        //aiPoints = aiPoints - cardPicked.value;
        if(user=="user"){
            aiPoints-=cardPicked.value;
            _.without(userCards,cardPicked);

        }
        elseif(user=="ai"){
            userPoints-=cardPicked.value;
            _.without(aiCards,cardPicked);

        }

    },

    function addPoints(user, cardPicked){
        if(user=="user"){
            userPoints+=cardPicked.value;   
            _.without(userCards,cardPicked);

        }
        elseif(user=="ai"){
            aiPoints+=cardPicked.value; 
            _.without(aiCards,cardPicked);
        }    
    },


    function getMax(type, arrayofCards){
        var max = {};
        for(i = 0; i < arrayofCards.length; i++){
            if(arrayofCards[i].type==type){
                if(max=={}){
                    max = arrayofCards[i];
                }
                else{
                    if(arrayofCards[i].value > max.value){
                    max = arrayofCards[i];
                    }
                }
            }  
        }
        return max;
    },

    function artificialIntelligence(cardsLeft){
        //TO DO: PICK BEST DECISIONS FOR AI. BIGGEST ATTACK FOR ENEMY, BIGGEST DEFENSE FOR SELF

        if(aiPoints=<10){
            //DEFENSE
            bestCard = getMax(defense, cardsLeft);
            addPoints("ai", bestCard);

        }
        
        else{
            //OFFENSE
            bestCard = getMax(offense, cardsLeft);
            deductPoints("ai", bestCard);

        }
        
    }
}
module.exports = exportedMethods;