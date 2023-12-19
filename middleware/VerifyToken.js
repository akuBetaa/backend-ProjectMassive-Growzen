// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if ( token === null ) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) return res.sendStatus(403);
//         req.email = decoded.email;
//         next();
//     })
// }

import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token, "<<<<<<<<<<<< token");

    if (!token) return res.sendStatus(401);

    try {
        var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        // err
        console.log(err);
        return res.status(400).json({ message: "error decode" })
    }

    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) return res.sendStatus(403);

    //     return decoded
    // })
    console.log(decoded.id, "<<<<<<<<<<<<decode");

    const foundUsers = await Users.findOne({
        where: {
            id: decoded.userId
        }
    })

    req.loggedUser = {
        id: foundUsers.id,
        name: foundUsers.name,
        email: foundUsers.email,
    };
    next();
}