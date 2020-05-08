const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwt_auth } = require('../config/keys')
const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_auth);
        const user = await User.findOne({ _id: 
payload.id
, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'do not have a permission or approval' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'some wrong with the  token' })
    }

}

module.exports = { authentication }