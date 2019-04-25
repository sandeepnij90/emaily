const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./RecipientSchema');
const SurveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('surveys', SurveySchema);