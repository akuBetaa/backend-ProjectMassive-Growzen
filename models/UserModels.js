const Users =
    `create table if not exists user(
            id int PRIMARY KEY AUTO_INCREMENT UNIQUE,
            uuid VARCHAR(36) UNIQUE NOT NULL,
            name varchar(255)not null ,
            email varchar(255)not null UNIQUE,
            password varchar(100)not null,
            role varchar(30)
        )`;

export default Users;

