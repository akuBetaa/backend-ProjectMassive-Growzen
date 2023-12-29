import mysql from "mysql2";

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DBNAME,
    password: process.env.DB_PASSWORD
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'webtbc_db',
//     password: '1234'
// });

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Koneksi Database Berhasil.');
});

export default db;
