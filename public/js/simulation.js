var list = document.getElementById('savedInputs');
var ls = document.getElementById('aiHP');
var ls2 = document.getElementById('userHP');
var uCards = document.getElementById('cardsContainer');
// var userCards = [];
// var aiCards = [];

var userCards = [{
    "title": "Glare",
    "desc": "It seems looks really can kill.",
    "type": "Attack",
    "value": 2
},
{
    "title": "Final Presentation",
    "desc": "It's like that dream, where you're standing in your underwear.",
    "type": "Attack",
    "value": 10
},
{
    "title": "Black Cat",
    "desc": "Some think black cats are unlucky, this one isn't.",
    "type": "Defense",
    "value": 5
},
{
    "title": "Glowing Butterfly",
    "desc": "Oooh, something shiny!",
    "type": "Defense",
    "value": 1
},
{
    "title": "Vlad",
    "desc": "He vants to suck your blood.",
    "type": "Attack",
    "value": 7
}]

aiCards = [{
    "title": "Lucky Goldfish",
    "desc": "Heart of gold, this fish is worth its weight in gold.",
    "type": "Defense",
    "value": 6
},
{
    "title": "Green Thumb",
    "desc": "They said she could grow anything, so she grows vines that choke the life out of her enemy.",
    "type": "Attack",
    "value": 5
},
{
    "title": "Luna Sol",
    "desc": "Sunrise, sunset, you don't want to get this celestial being upset.",
    "type": "Attack",
    "value": 3
}, {
    "title": "Beyonce",
    "desc": "She doesn't really need a description.",
    "type": "Attack",
    "value": 10
},
{
    "title": "Water Bender",
    "desc": "Can heal you with the power of water.",
    "type": "Defense",
    "value": 10
}]

var aiHP = 20;
var userHP = 20;

(function () {
    const cardMethods = {
        check(str) {
            if (typeof str !== "string") throw "Must provide a string";
            return str == str.split('').reverse().join('');
        },
        simplify: function (text) {
            if (!text) throw "You must provide text!";
            text = text.toLowerCase();
            text = text.replace(/[.,\/#!$?%\^\"\’\'&\*;:{}=\-_`~()]/g,'');
            text = text.replace(/\s{1,}/g,'');
            text = text.replace(/\r?\n|\r|\t/g, '');
            return text;
        },
        seed: function () {            
            ls.appendChild(document.createTextNode(aiHP));
            ls2.appendChild(document.createTextNode(userHP));
            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: '/privategame/cards',
                success: function (data) {
                    userCards = data.userCards;
                    aiCards = data.aiCards;

                    // console.log('success');
                    // console.log(data.test);
                    // console.log(JSON.stringify(data));
                }
            });

            return 1;
        },
        displayCards : function () {
            for(i = 0; i < userCards.length; i++) {
                cardsContainer.innerHTML = userCards[i].title, userCards[i].value;
            }
        }
    };

    const staticForm = document.getElementById("static-form");
    const isSeeded = cardMethods.seed();
    cardMethods.displayCards();

    if (staticForm) {
        const userInputElement = document.getElementById("input");

        const errorContainer = document.getElementById("error-container");
        const errorTextElement = errorContainer.getElementsByClassName(
            "text-goes-here"
        )[0];

        staticForm.addEventListener("submit", event => {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");

                const userInputValue = userInputElement.value;
                console.log(userInputValue);

                // const simpleInput = cardMethods.simplify(userInputValue);
                // const result = cardMethods.check(simpleInput);
                userHP--;
                aiHP -= 5;

                // var entry = document.createElement('li');
                // if(result) {
                //     entry.classList.add('is-palindrome');
                // } else {
                //     entry.classList.add('not-palindrome');
                // }
                // entry.appendChild(document.createTextNode(simpleInput));
                // list.appendChild(entry);
                ls.innerHTML = aiHP;
                ls2.innerHTML = userHP;

            } catch (e) {
                const message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();