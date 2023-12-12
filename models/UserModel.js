//Akan digunakan untuk CREATE TABLE di DATABASE MYSQL

import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Users = db.define('users', { 
    name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    refresh_token : {
        type : DataTypes.TEXT
    },
}, {
    freezeTableName: true,
})

export default Users;