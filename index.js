import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Users from "./models/UserModel.js"; (import untuk membuat tabel Users)
import router from "./routes/index.js";

dotenv.config();

const app = express();
const port = 3005;

try {
    await db.authenticate();
    console.log ('Database connected....');
    // await Users.sync(); (untuk membuat table di mysql)
} catch (error) {
    console.error(error);
}

// { credentials: true, origin: 'http://localhost:5173'};
//supaya dapat diakses keluar port. letak domain ada di origin : 'http:localhost:post!!!'
app.use(cors( ));
//digunakan untuk token supaya tidak perlu refresh token apabila sudah login
app.use(cookieParser());
//express.jeson untuk menerima data dalam bentuk json
app.use(express.json());
//Midleware
app.use(router);

app.listen(port, () => console.log(`Server running at port ${port}`))