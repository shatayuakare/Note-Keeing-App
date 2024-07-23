import { JsonWebTokenError } from "jsonwebtoken";

const jwt = JsonWebTokenError;

export const AuthenticationToken = (req, res, next) => {
    const authHeader = req.headers["authentication"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);


    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(401);

        req.user = user;
        next();
    })

}