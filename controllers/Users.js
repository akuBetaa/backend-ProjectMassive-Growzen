// import Users from "../models/UserModels.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { v4 as uuidv4 } from 'uuid';

//memanggil seluruh data user
export const getUsers = async(req, res) => {
    try {
        const query = "SELECT * FROM user";
    
        const data = await new Promise((resolve, reject) => {
          db.query(query, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
    
        return res.status(200).json(data);
      } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).send("Server Internal Error");
      }
}

//memanggil data user berdasarkan id
export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Ambil ID dari parameter URL
  
      const query = "SELECT * FROM user WHERE id = ?";
  
      const data = await new Promise((resolve, reject) => {
        db.query(query, [userId], (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  
      if (data.length === 0) {
        return res.status(404).send("Data user tidak ditemukan");
      }
  
      return res.status(200).json(data[0]); // Kembalikan data pertama (hanya satu pengguna berdasarkan ID)
    } catch (error) {
      console.error("Error pada getUserById:", error);
      return res.status(500).send("Internal Server Error");
    }
  };


  //menambah data user
  export const createUser = async (req, res) => {
    try {
      const { name, email, password, confPassword, role } = req.body;
  
      // Pastikan data yang diterima sesuai dengan skema tabel
      if (!name || !email || !password || !confPassword) {
        return res.status(400).send("nama, email, password dan konfirmasi password wajib diisi!");
      }
  
      if (password !== confPassword) {
        return res.status(400).send("Password dan Konfirmasi Password tidak sama");
      }
  
      // Hash password menggunakan Argon2
      const hashedPassword = await argon2.hash(password);
  
      const userUuid = uuidv4(); // Membuat UUID baru
  
      const query = "INSERT INTO user (uuid, name, email, password, role) VALUES (?, ?, ?, ?, ?)";
  
      const result = await new Promise((resolve, reject) => {
        db.query(query, [userUuid, name, email, hashedPassword, role], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      const insertedUserId = result.insertId;
  
      return res.status(201).json({ userId: insertedUserId, message: "User berhasil ditambahkan" });
    } catch (error) {
      console.error("Error pada createUser:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  //membuat register (yang ditambahkan hanya dengan role user)
  export const registerUser = async (req, res) => {
    try {
      const { name, email, password, confPassword } = req.body;
  
      // Pastikan data yang diterima sesuai dengan skema tabel
      if (!name || !email || !password || !confPassword) {
        return res.status(400).send("nama, email, password dan konfirmasi password wajib diisi!");
      }
  
      if (password !== confPassword) {
        return res.status(400).send("Password dan Konfirmasi Password tidak sama");
      }
  
      // Hash password menggunakan Argon2
      const hashedPassword = await argon2.hash(password);
  
      const userUuid = uuidv4(); // Membuat UUID baru

      const role = "user"; //untuk menambahkan role user
  
      const query = "INSERT INTO user (uuid, name, email, password, role) VALUES (?, ?, ?, ?, ?)";
  
      const result = await new Promise((resolve, reject) => {
        db.query(query, [userUuid, name, email, hashedPassword, role], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      const insertedUserId = result.insertId;
  
      return res.status(201).json({ userId: insertedUserId, message: "User berhasil ditambahkan" });
    } catch (error) {
      console.error("Error pada createUser:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  //untuk memperbaharui user
  export const updateUser = async (req, res) => {
    try {
      const userId = req.params.id; //sdad
  
      // mengkonneksikan tabel user {pastikan kamu meiliki}
      const [user] = await db.promise().query('SELECT * FROM user WHERE id = ?', [userId]);

      if (user.length === 0) {
        return res.status(404).json({ msg: "Pengguna Tidak Ditemukan" });
      }
  
      const { name, email, password, confPassword, role } = req.body;
  
      let hashPassword;
      if (password === "" || password === null) {
        hashPassword = user[0].password; // Adjust accordingly based on your table structure
      } else {
        hashPassword = await argon2.hash(password);
      }
  
      if (password !== confPassword) {
        return res
          .status(400)
          .json({ msg: "Password dan Konfirmasi Password tidak cocok " });
      }
  
      await db.promise().query(
        'UPDATE user SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
        [name, email, hashPassword, role, userId]
      );
  
      res.status(200).json({ msg: "User Berhasil di Ubah" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    } 
  };
  

  //untuk menghapus user

  export const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Assuming you have a table named 'user'
      const [user] = await db.promise().query('SELECT * FROM user WHERE id = ?', [userId]);
  
      if (user.length === 0) {
        return res.status(404).json({ msg: "Pengguna Tidak Ditemukan" });
      }
  
      await db.promise().query('DELETE FROM user WHERE id = ?', [userId]);
  
      res.status(200).json({ msg: "User berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  