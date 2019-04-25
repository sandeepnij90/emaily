module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(422).send({ error: 'insufficient funds' });
    }
    next();
}