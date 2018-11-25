const mongoose = require('mongoose')

// Create expense schema 
const repeatingExpenseSchema = mongoose.Schema({
    name: String,
    dueDate: Date,
    baseValue: Float64Array,r,
    houseID: String,
    removed: Boolean
});

module.exports = mongoose.model('expenses', repeatingExpenseSchema);