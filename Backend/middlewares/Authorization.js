const jwt = require("jsonwebtoken");


const isLoggedin = (req, res, next) => {
    try {
        console.log("ok token: ", req.headers['token'])
        let token = req.headers['token'];
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ message: "Login first to do the changes!" });
                return
            }

            if (!decode)
                res.status(401).json({ message: "Wrong Cradential" })
            else {
                req.user = decode
                next();
            }
        });
    } catch (error) {
        console.log("error at authorization middleware", error)
        next(error)
    }

}

module.exports = { isLoggedin }
