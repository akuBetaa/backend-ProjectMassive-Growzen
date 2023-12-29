-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webtbc_db
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` varchar(10000) NOT NULL,
  `img` varchar(225) DEFAULT NULL,
  `url` varchar(225) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `userId` (`userId`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'46976d1d-2456-409a-9b28-3b20e3c8120b','Beta Nurul Awwalin','admin@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$9QVq/oKxm2SiCjrm57VcGA$dyLelzcHzb68cTeCdTen1hFM8zLRYVQRe7kWvTywVVk','admin'),(3,'25500c5f-5286-4477-9658-65c30118be46','Beta Update2','user@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$tHdr3b4h9/23WD1/nKagIg$9TIsPWy3OYZavUNiAVZGZNGa1QIiaWFz+kszUDlFY6k','user'),(8,'125ec74b-44e4-410c-a92d-adfa9afed4c9','User by Web','user2@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$2MHAreG7ZqRP+itvF6wCmg$DUgirtCPtkoVxej8a+iPfO49Su3RtYfR9yX4hMpwBiI','user'),(11,'c89ba13a-dbb6-49ca-b25e-5dd10fc3345b','User 3 Web','user3@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$3Q4xVKjXN+yOEA1nQFrYQQ$lpE6rnj87I7h14YcT/Zo3HgqzVle0q9JGCa8xDXLF9I','user'),(47,'6b91ef93-a414-47b6-a045-e7a7fd7b3af7','Dari Web','user4@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$Olfy/JKyyUeVjm0RfHq09w$Xq1eZtb17lrPJL7qm94RpUFLfRku8oKHpV28MTmYacs','user'),(48,'15384d79-f67f-410d-ad2e-71dd6d590276','User 5','user5@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$8gPXiGAW9LspWv5FsgCwjg$fe29MEvmpO4iqbILv8o//P4r8xCSymY3G+89HByaVFk','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-29 18:58:21
