const mongoCollections = require("../config/mongoCollections");
const userDb = mongoCollections.userCollection;

// For testing login:
// username: "masterdetective123"
// password: "elementarymydearwatson",

let exportedMethods = {
    async getUserById(id) {
        if (!id) throw "No ID provided.";
        const userCol = await userDb();
        const users = await userCol.find().toArray();
        for (i = 0; i < users.length; i++) {
            let user = users[i];
            if (user._id === id) {
                return user;
            }
        }
        return "User not found: " + id;
    },
    async getUserByUsername(username) {
        if (!username) throw "No username provided.";
        const userCol = await userDb();
        const users = await userCol.find().toArray();
        //console.log("our users are" + users);
        for (i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username === username) {
                return user;
            }
        }
        return "User not found: " + username;
    },
    async updateUserProfile(user, userName, favoriteCard) {

        console.log("userName is " + userName);
        console.log("user Id is " + user._id)
        const userCollection = await userDb();
        user.firstName = userName;
        user.favoriteCard = favoriteCard;
        // console.log("user id " + user.id);
        let updateCommand = {
            $set: user
        };
        const update = await userCollection.updateOne({_id: user._id}, updateCommand);


        // const upToDateRecipe = await this.getRecipeById(id);
    }
}
//
//     async updateRecipe(id, updatedRecipe) {
//
//         const currentRecipe = await this.getRecipeById(id);
//
//         let recipeUpdateInfo = {};
//
//         if(updatedRecipe.title)
//             recipeUpdateInfo.title = updatedRecipe.title;
//
//         if(updatedRecipe.ingredients)
//             recipeUpdateInfo.ingredients = updatedRecipe.ingredients;
//
//         if(updatedRecipe.steps)
//             recipeUpdateInfo.steps = updatedRecipe.steps;
//
//         if(updatedRecipe.comments)
//             recipeUpdateInfo.comments = updatedRecipe.comments;
//
//         let updateCommand = {
//
//             $set: recipeUpdateInfo
//         };
//
//
//         const recipeCollection = await recipes();
//
//         await recipeCollection.updateOne({ _id: id }, updateCommand);
//
//         const upToDateRecipe = await this.getRecipeById(id);
//
//
// };


module.exports = exportedMethods;