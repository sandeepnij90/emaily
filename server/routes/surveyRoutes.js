const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/templates/surveyTemplate');
const Path = require('path-parser').default;
const _ = require('lodash');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

module.exports = app => {
    app.post('/api/survey', requireLogin, requireCredits, async (req, res) => {
        const {title, body, subject, recipients } = req.body;
        const survey = await new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await survey.save();
            await mailer.send();

            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch(error) {
            res.send(error);
        }
    });

    app.get('/api/survey', requireLogin, async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
        res.send(surveys);
    })

    app.get('/api/survey/:surveyID/:choice', (req, res) => {
        res.redirect('/survey/thanks');
    });

    app.post('/api/survey/webhooks', (req, res) => {
        const p = new Path('/api/survey/:surveyID/:choice');

        _.chain(req.body)
        .map(({url, email}) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
                return { email, surveyID: match.surveyID, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('surveyID', 'email')
        .each(({surveyID, email, choice}) => {
            Survey.updateOne({
                _id: surveyID,
                recipients : {
                    $elemMatch: {email: email, responded: false}
                }
            }, {
                $inc: { [choice] : 1 },
                $set: { 'recipients.$.responded' : true }
            }).exec();
        })
        .value();

        res.send({})

    });

}