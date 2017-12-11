const mongoCollections = require("../config/mongoCollections");
const cards = mongoCollections.cards;
const uuid = require('uuid');

let exportedMethods = {

    async getAllCards() {
        const cardCollection = await cards();
        return await cardCollection.find({},{id: 1, title: 1}).toArray();
    }

    // async addCard(title, desc, type, value) {
    //     if (typeof title !== "string") throw "Title must be of type string.";
    //     if (typeof desc !== "string") throw "Description must be of type string.";
    //     if (typeof type !== "string") throw "Type must be of type string.";
    //     if (typeof value !== "number") throw "Value must be of type number.";

    //     const cardCollection = await cards();

    //     const newCard = {
    //         _id: uuid.v4(),
    //         title: title,
    //         desc: desc,
    //         type: type,
    //         value: value
    //     };

    //     const newInsertInformation = await cardCollection.insertOne(newCard);
    //     const newId = newInsertInformation.insertedId;
    //     return await this.getCardById(newId);
    // },

    // async removeCard(id) {
    //     if(!id) throw "No ID provided."
    //     const cardCollection = await card();
    //     const deletionInfo = await cardCollection.removeOne({
    //         _id: id
    //     });
    //     if (deletionInfo.deletedCount === 0) {
    //         throw `Could not delete card with id of ${id}`;
    //     }
    // }
}

module.exports = exportedMethods;