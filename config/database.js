import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'webtbc_db',
    password: '1234'
});

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Koneksi Database Berhasil.');
});

export default db;
