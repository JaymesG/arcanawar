var list = document.getElementById('savedInputs');
var ls = document.getElementById('aiHP');
var ls2 = document.getElementById('userHP');

var aiHP = 20;
var userHP = 20;

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
            return 1;
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
            
                //var outputcards = document.getElementById('outputusercards');
                //outputcards.innerHTML(usercards);

            } catch (e) {
                const message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();