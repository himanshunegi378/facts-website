const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactSchema = new Schema({
    fact: {
        type: String,
        required: true
    },
})

module.exports = Fact = mongoose.model("facts", FactSchema);
