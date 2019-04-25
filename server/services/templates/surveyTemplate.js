const keys = require('../../config/keys');
module.exports = survey => {
    return (
        `<html>
        <body>
        <div style="text-align: center">
        <h1>We need your help!</h1>
        <p>Please answer the following question below</p>
        <p>${survey.body}</p>
        <a href="${keys.redirectDomain}/api/survey/${survey._id}/yes">yes</a>
        <a href="${keys.redirectDomain}/api/survey/${survey._id}/no">no</a>
        </div>
        </body>
        </html>`
    )
}