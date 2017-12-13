const mongoCollections = require("../config/mongoCollections");
const cards = mongoCollections.cardCollection;
const uuid = require('uuid');

let exportedMethods = {

    async getAllCards() {
        const cardCollection = await cards();
        const cardArray = await cardCollection.find({}).toArray();
        return cardArray;
    }
};

module.exports = exportedMethods;