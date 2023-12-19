import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const { email } = req.loggedUser
        console.log(email);
        const users = await Users.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}


//function register
export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    if (password !== confPassword)
        return res.status(400).json({ msg: "Password dan Konfirmasi Password tidak cocok" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Register Berhasil" })
    } catch (error) {
        console.log(error);
    }
}

//function login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, "<<<<<<<<email");
        const user = await Users.findOne({
            //mencari berdasarkan email
            where: {
                email: email
            }
        });

        console.log(user.password);
        console.log(password);

        //pembandingan password client dan database
        const match = await bcrypt.compare(password, user.password);
        //apabila password tidak macth
        if (!match) {
            res.status(400).json({ msg: "Password salah.." })
        }

        console.log("<<<<<<<<<match");

        const userId = user.id;
        const name = user.name;
        const emails = user.email;
        const accessToken = jwt.sign({ userId, name, emails }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10d'
        });

        // const refreshToken = jwt.sign({ userId, name, emails }, process.env.REFRESH_TOKEN_SECRET, {
        //     expiresIn: '1d'
        // });

        // await Users.update({ refresh_token: refreshToken }, {
        //     where: {
        //         id: userId
        //     }
        // });
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // });

        res.json({ accessToken });

    } catch (error) {
        //respon apabila user tidak ditemukan
        res.status(400).json({ msg: "Email tidak ditemukan" });
    }
}


//function logout
export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);

    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}