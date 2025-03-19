const jwt = require('jsonwebtoken') 

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.render('error', {err:'No valid token'});
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, token) => {
    if (error) return res.render('error',error);
    req.email = token.email;
    next();
    });
};
module.exports = authenticateJWT