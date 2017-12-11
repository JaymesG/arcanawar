// const users = [
//     {
//         _id: "1245325124124",
//         username: "masterdetective123",
//         firstName: "Sherlock",
//         lastName: "Holmes ",
//         profession: "Detective",
//         bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
//         //password: "elementarymydearwatson",
//         hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."
//     },
//     {
//         _id: "723445325124124",
//         username: "lemon",
//         firstName: "Elizabeth",
//         lastName: "Lemon",
//         profession: "Writer",
//         bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
//         //password: "damnyoujackdonaghy",
//         hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"
//     },
//     {
//         _id: "545325124124",
//         username: "theboywholived",
//         firstName: "Harry",
//         lastName: "Potter",
//         profession: "Student",
//         bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
//         //password: "quidditch",
//         hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"
//     }
// ];
const mongoCollections = require("../config/mongoCollections");
const userDb = mongoCollections.userCollection;


let exportedMethods = {
        async getUserById(id) {
            if(!id) throw "No ID provided.";
            const userCol = await userDb();
            const users = await userCol.find().toArray();
            for (i = 0; i < users.length; i++) {
                let user = users[i];
                if(user._id === id) {
                    return user;
                }
            }
            return "User not found: " + id;
        },
        async getUserByUsername(username) {
            if(!username) throw "No username provided.";
            const userCol = await userDb();
            const users = await userCol.find().toArray();
            console.log("our users are" + users);
            for (i = 0; i < users.length; i++) {
                let user = users[i];
                if(user.username === username) {
                    return user;
                }
            }
            return "User not found: " + username;
        }
    };

module.exports = exportedMethods;