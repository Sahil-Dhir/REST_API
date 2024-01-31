const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(5);
        verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) {
                console.log(error)
                res.json({
                    success: 0,
                    message: "Invalid Token"

                });
            }
            else {
                next();
            }
        })
    }
    else {
        res.json({
            success: 0,
            message: "Acces Denied unauthorized user"
        })
    }

};
module.exports = {
    checkToken
};