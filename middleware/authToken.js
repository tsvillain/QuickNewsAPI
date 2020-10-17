const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({ status: 'fail', message: 'Access Denied', });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(401).json({
                status: "failure",
                error: "unauthorised access"
            })
            return;
        }
        req.authData = decode;
        next();
    })
}

module.exports = authToken;