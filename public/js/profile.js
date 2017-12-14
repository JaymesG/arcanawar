
    document.addEventListener("DOMContentLoaded", () => {

        let userForm = document.getElementById("name-form");

        let userName = document.getElementById("input-text-name");

        let favoriteCard = document.getElementById("input-text-card");


        function checkedPalindromeListItem(isPalindrome, item) {

            let listElement = document.createElement("li");

            listElement.textContent = item;

            if (isPalindrome) {
                listElement.className += " is-palindrome";
            }
            else {
                listElement.className += " not-palindrome";
            }

            return listElement;
        }

        userForm.addEventListener("submit", (e) => {

            e.preventDefault();
            console.log("our username shold be " +  userName.value);
            console.log("our card name shold be " +  favoriteCard.value);
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    userName: userName.value,
                    favoriteCard: favoriteCard.value
                })
        ,
                contentType: 'application/json',
                url: '/profile',
                success: function (data) {
                    console.log('success');
                    console.log(JSON.stringify(data));
                }
            });

            // let inputText;
            // if(inputtedText){
            //     inputText = inputtedText.value;
            // } else {
            //     inputText = "";
            // }
            // let cleanText = inputText.toLowerCase().replace(/[^A-Za-z0-9]/g, "");
            //
            // let isPalindrome = cleanText === cleanText.split("").reverse().join("");
            //
            // let listItem = checkedPalindromeListItem(isPalindrome, inputText);
            //
            // checkedList.appendChild(listItem);
        });

    });
