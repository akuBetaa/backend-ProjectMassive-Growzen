const createBlogs =
    `create table if not exists blog(
            id int PRIMARY KEY AUTO_INCREMENT UNIQUE,
            uuid VARCHAR(36) UNIQUE NOT NULL,
            title varchar(255)not null,
            text varchar(10000)not null,
            img varchar(225),
            url varchar(225),
            userId INT,
            FOREIGN KEY (userId) REFERENCES user(id)
        )`;

export default createBlogs;

