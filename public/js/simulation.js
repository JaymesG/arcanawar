var list = document.getElementById('savedInputs');
var ls = document.getElementById('aiHP');
var ls2 = document.getElementById('userHP');
var uCards = document.getElementById('cardsContainer');
var userCards= [];
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
                cardsContainer.innerHTML = userCards[i].title, userCards[i].value;
            }
        }
    };

    const staticForm = document.getElementById("static-form");
    const isSeeded = await cardMethods.seed();
    console.log(userCards);
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

                const simpleInput = cardMethods.simplify(userInputValue);
                const result = cardMethods.check(simpleInput);
                userHP--;
                aiHP -= 5;

                var entry = document.createElement('li');
                if(result) {
                    entry.classList.add('is-palindrome');
                } else {
                    entry.classList.add('not-palindrome');
                }
                entry.appendChild(document.createTextNode(simpleInput));
                list.appendChild(entry);
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