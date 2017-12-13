

document.addEventListener("DOMContentLoaded", () => {

    let palindromeForm = document.getElementById("palindrome-form");

    let checkedList = document.getElementById("items-checked-list");

    let inputtedText = document.getElementById("input-text");


    function checkedPalindromeListItem(isPalindrome, item) {

        let listElement = document.createElement("li");

        listElement.textContent = item;

        if (isPalindrome){
            listElement.className += " is-palindrome";
        }
        else {
            listElement.className += " not-palindrome";
        }

        return listElement;
    }

    palindromeForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let inputText;
        if(inputtedText){
            inputText = inputtedText.value;
        } else {
            inputText = "";
        }
        let cleanText = inputText.toLowerCase().replace(/[^A-Za-z0-9]/g, "");

        let isPalindrome = cleanText === cleanText.split("").reverse().join("");

        let listItem = checkedPalindromeListItem(isPalindrome, inputText);

        checkedList.appendChild(listItem);
    });

});