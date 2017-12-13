var list = document.getElementById('savedInputs');
var ls = document.getElementById('aiHP');
var ls2 = document.getElementById('userHP');
var displayCards = document.getElementById('cardList');

const cards = [
    {
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


const aiHP = 20;
const userHP = 20;

(function () {
    const palindromeMethods = {
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
            displayCards.appendChild(document.createTextNode(JSON.stringify(cards)));
            return 1;
        },
        getUHP: function () {
            return userHP;
        }
    };

    const staticForm = document.getElementById("static-form");
    const isSeeded = palindromeMethods.seed();

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

                const simpleInput = palindromeMethods.simplify(userInputValue);
                const result = palindromeMethods.check(simpleInput);

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