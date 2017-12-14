var list = document.getElementById('savedInputs');
var ls = document.getElementById('aiHP');
var ls2 = document.getElementById('userHP');
var uCards = document.getElementById('cardsContainer');
var gameOutput = document.getElementById("demo");
var userCards = [];
var aiCards = [];

var aiHP = 20;
var userHP = 20;

(async function () {
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
            return $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: '/privategame/cards'
                // success: function (data) {
                //     userCards = data.userCards;
                //     aiCards = data.aiCards;
                //
                //     // console.log('success');
                //     // console.log(data.test);
                //     // console.log(JSON.stringify(data));
                // }
            }).then(function (data){
                console.log(data);
                userCards = data.userCards;
                aiCards = data.aiCards;
                console.log('eventually called');
            });

            },
        displayCards : function () {
            for(i = 0; i < userCards.length; i++) {
                cardsContainer.appendChild(document.createElement("br"));
                cardsContainer.appendChild(document.createTextNode(i+1 + ". " + userCards[i].title + " - " + userCards[i].type + " : " + userCards[i].value));
                cardsContainer.appendChild(document.createElement("br"));
                cardsContainer.appendChild(document.createTextNode(userCards[i].desc));
                cardsContainer.appendChild(document.createElement("br"));
            }
        }
    };

    const staticForm = document.getElementById("static-form");
    const isSeeded = await cardMethods.seed();
    console.log(userCards);
    cardMethods.displayCards();

    if (staticForm) {
        // const userInputElement = document.getElementById("input");

        // const errorContainer = document.getElementById("error-container");
        // const errorTextElement = errorContainer.getElementsByClassName(
        //     "text-goes-here"
        // )[0];

        staticForm.addEventListener("submit", event => {
            event.preventDefault();

            try {
                // hide containers by default
                // errorContainer.classList.add("hidden");
                let selectedIndex = -1;
                //console.log("here");
                for(let i = 0; i < 5; i++)
                {
                    if (document.getElementById("myRadio " + i).checked){
                        selectedIndex = i;
                    }
                }
                document.getElementById("myRadio " + selectedIndex).checked = false;
                document.getElementById("myRadio " + selectedIndex).disabled = true;                
                var selectedCard = userCards[selectedIndex];
                var selectedValue = selectedCard.value;
                var selectedType = selectedCard.type;
                var selectedDesc = selectedCard.desc;
                var selectedTitle = selectedCard.title;

                var selectedAiCard;
                var selectedAiValue;
                var selectedAiType;
                var selectedAiDesc;
                var selectedAiTitle;


                if(selectedType === "Attack") {
                    aiHP -= selectedValue;
                }else {
                    userHP += selectedValue;
                }
                
                let hasAttack = false;
                for(let i = 0; i < aiCards.length; i++){
                    if(aiCards[i] === "Attack"){
                        hasAttack = true;
                    }
                }
                let hasDefense = false;
                for(let i = 0; i < aiCards.length; i++){
                    if(aiCards[i] === "Defense"){
                        hasDefense = true;
                    }
                }
                // AI health good
                if ((aiHP >= 10 && hasAttack) || !hasDefense) {

                    for(i = 0; i < aiCards.length; i++) {
                        if(aiCards[i] === "Attack") {
                            userHP -= aiCards[i].value;
                            selectedAiCard = aiCards[i];
                            selectedAiValue = selectedAiCard.value;
                            selectedAiType = selectedAiCard.type;
                            selectedAiDesc = selectedAiCard.desc;
                            selectedAiTitle = selectedAiCard.title;
                            aiCards.splice(i, 1);
                        }
                    }

                // AI health bad
                }else {

                    for(i = 0; i < aiCards.length; i++) {
                        if(aiCards[i] === "Defense") {
                            aiHP += aiCards[i].value;
                            selectedAiCard = aiCards[i];
                            selectedAiValue = selectedAiCard.value;
                            selectedAiType = selectedAiCard.type;
                            selectedAiDesc = selectedAiCard.desc;
                            selectedAiTitle = selectedAiCard.title;
                            aiCards.splice(i, 1);
                        }
                    }
                    
                }

                console.log(selectedIndex);
                gameOutput.innerHTML = "You chose the card: " + selectedTitle + ". The AI decided to play the card " + selectedAiTitle + " which was an " + selectedAiType + " card with a value of " + selectedAiValue;

                //const userInputValue = userInputElement.value;
                //console.log(userInputValue);

                // const simpleInput = cardMethods.simplify(userInputValue);
                // const result = cardMethods.check(simpleInput);
                // userHP += theValue.value;
                // aiHP -= 5;

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
                // errorTextElement.textContent = e;
                // errorContainer.classList.remove("hidden");
            }
        });
    }
})();