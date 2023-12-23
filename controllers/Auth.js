import argon2 from "argon2";
import db from "../config/Database.js";


//untuk login
export const Login = async (req, res) => {
  try {
    const email = req.body.email;

    // Gantilah sesuai dengan format kolom dan tabel di database Anda
    const query = 'SELECT * FROM user WHERE email = ? LIMIT 1';

    db.query(query, [email], async (error, results) => {
      if (error) {
        console.error(error);
        throw new Error("Terjadi kesalahan server");
      }

      const user = results[0];

      if (!user)
        throw new Error("Email user tidak ditemukan");

      const match = await argon2.verify(user.password, req.body.password);
      if (!match)
        throw new Error("Password yang dimasukkan salah");

      req.session.userId = user.uuid;
      const { uuid, name, email, role } = user;

      res.status(200).json({ uuid, name, email, role });
    });
  } catch (error) {
    console.error("Kesalahan selama proses login:", error.message);
    return res.status(500).json({ msg: "Kesalahan server internal" });
  }
};


export const Me = async (req, res) => {
  if(!req.session.userId) {
      return res.status(401).json({ msg : "Mohon login ke akun Anda"})
  }

  const query = 'SELECT uuid, name, email, role FROM user   WHERE uuid = ?';

  db.query(query, [req.session.userId], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ msg: 'Error while fetching user data' });
      }

      if (results.length === 0) {
          return res.status(404).json({ msg: 'Email user tidak ditemukan' });
      }

      const user = results[0];
      res.status(200).json(user);
  });
}

export const Logout = (req, res) => {
  // if (!req.session.userId) {
  //   return res.status(401).json({ msg : "Mphpn login ke akun Anda"})
  // }

  // const query = "SELECT uuid, name, email, role FROM user   WHERE uuid = ?"
  req.session.destroy((err) => {
    if(err)
        return res.status(400).json({ msg : "Tidak dapat logout"});
    res.status(200).json({ msg : "Anda telah logout"});
})
}