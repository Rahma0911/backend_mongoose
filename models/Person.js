const mongoose = require("mongoose");

const {Schema} = mongoose ;

const personSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String],

});

module.exports = Person = mongoose.model("person", personSchema);