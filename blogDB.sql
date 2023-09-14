-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `title` text,
  `user_id` int DEFAULT NULL,
  `username` text,
  `post_id` int DEFAULT NULL,
  `created_at` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'test',NULL,1,NULL,1,NULL),(2,'put your hand up','all the single ladies',31,NULL,1,'2023-09-03 14:01:01'),(3,'Is this me you looking for?','Hello',31,NULL,1,'2023-09-03 14:25:26'),(4,'Very nice post mister','Wow',31,NULL,25,'2023-09-03 14:51:57'),(5,'123123','Test',31,NULL,22,'2023-09-03 14:53:09');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tags`
--

DROP TABLE IF EXISTS `post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_tags` (
  `post_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  KEY `post_id` (`post_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tags`
--

LOCK TABLES `post_tags` WRITE;
/*!40000 ALTER TABLE `post_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `content` text,
  `user_id` int DEFAULT NULL,
  `username` text,
  `created_at` text,
  `last_update` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Title 1','Content 1',1,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(2,'Title 2','Content 2',1,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(3,'Title 3','Content 3',2,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(4,'Title 4','Content 4',2,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(5,'Title 5','Content 5',3,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(6,'Title 6','Content 6',3,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(7,'Title 7','Content 7',4,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(8,'Title 8','Content 8',4,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(9,'Title 9','Content 9',5,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(10,'Title 10','Content 10',5,NULL,'2023-05-24 21:19:51','2023-05-24 21:19:51'),(11,'123','sfkjlsdf',NULL,NULL,NULL,NULL),(12,'123','sfkjlsdf',NULL,NULL,NULL,NULL),(13,'123','sfkjlsdf',NULL,NULL,NULL,NULL),(14,'123','sfkjlsdf',NULL,NULL,NULL,NULL),(15,'123','sfkjlsdf',NULL,NULL,NULL,NULL),(16,'123','sfkjlsdf',NULL,NULL,NULL,NULL),(17,'456','asd',NULL,NULL,NULL,NULL),(18,'sdsa','dd',NULL,NULL,NULL,NULL),(19,'d','dasda',NULL,NULL,NULL,NULL),(20,'helloworld','wassup',NULL,NULL,NULL,NULL),(22,'I\'ll take you the candy shop','pom pom pom',31,'gil','2023-09-03 00:07:26',NULL),(23,'im not afraid','to take a steps',31,'gil','2023-09-03 14:13:10',NULL),(25,'China','\nEmbarking on a journey through the enchanting landscapes of China is a captivating experience that unveils a rich tapestry of history, culture, and natural beauty. As I ventured into this vast country, the Great Wall stood as a testament to China\'s remarkable heritage, its ancient stones echoing tales of emperors and dynasties. The bustling streets of Beijing, adorned with colorful markets and exquisite temples, showcased a harmonious blend of tradition and modernity. Traveling south, the tranquil waters of the Li River meandered through the surreal karst formations of Yangshuo, painting a picture of serenity and timelessness. Shanghai\'s towering skyscrapers and vibrant cityscape offered a glimpse into China\'s dynamic future. Throughout the journey, the warmth and hospitality of the locals left an indelible mark, making China a destination of enduring wonder and discovery.',31,'gil','2023-09-03 14:45:09','2023-09-03 16:37:07'),(26,'Japan','My trip to Japan was an unforgettable adventure that left me in awe of this captivating country. From the bustling streets of Tokyo, where modernity and tradition coexist seamlessly, to the serene temples of Kyoto, where time seemed to stand still, every moment was a treasure trove of experiences. I marveled at the cherry blossoms in full bloom, sampled delectable sushi at a local izakaya, and immersed myself in the rich cultural heritage by partaking in a tea ceremony. Navigating the efficient train system was an adventure in itself, allowing me to explore the picturesque landscapes of rural Japan, where tranquil gardens and ancient castles offered glimpses into the nation\'s history. The warmth and hospitality of the Japanese people made me feel welcomed and cherished throughout my journey. Japan\'s blend of tradition and innovation, natural beauty, and cultural richness left an indelible mark on my heart, making it a destination I long to revisit.',32,'admin','2023-09-03 17:28:28','2023-09-03 17:28:28');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `user_id` int DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (21,'ccdd260c-563a-4ee4-a3dd-4c077ad54642'),(21,'50444c8f-a2cf-464d-9e97-6433927d4f0f'),(22,'c9c2acf5-509f-4d4c-87ce-d8550bbf0928'),(26,'5d52af3f-a806-4398-86f5-3dae1e308c95'),(27,'748b3e47-3caa-4835-a6f5-3803319311e4'),(27,'eaffec17-3433-4894-8415-c85837240428'),(27,'efdc34d3-04dc-4cf0-820f-8ac02a679ab6'),(27,'44b35907-c23e-49f2-9343-ac83d314fe9b'),(27,'55c85ef8-8f67-4edd-bcc5-fe5060e1994b'),(28,'ccb12207-e640-4b4a-8a2b-74b38920b790'),(28,'9b88a44f-6cee-4102-9314-e4aa2cb84f26'),(28,'16e22ece-9030-4fad-9dac-aca04953205a'),(27,'ad4b8cb5-b083-4637-8d24-132b7e2ea390'),(27,'96ffe82e-d4fb-4998-9f68-ed96cc978539'),(27,'55ba5e31-0ca4-4d43-9ae7-a5f467adcb13'),(27,'926e275e-c487-440a-ac08-256e82508fef'),(27,'f99ae3a1-0431-4888-a019-7b6dc29bf073'),(27,'f3e88c5c-6f5a-4dcc-baed-8837d18b6e8b'),(27,'4f6a5481-d8e5-48f9-96d7-ea3ed6f4865d'),(27,'7ce2b006-9c38-4d20-891d-d31d81cab9d5'),(27,'42a8d67d-c878-429d-b91b-6e3742fc3b49'),(27,'f1af4111-f112-4b9c-bbb2-8c241d289597'),(27,'2c826c6e-bc25-4a04-8ece-ed69461ba0ea'),(27,'a8c30242-01c9-4210-815f-ee10dd035cb1'),(27,'bd7e2c5f-8d6e-4f9f-bbc5-8f235d44d92a'),(27,'7c01649c-eae2-4cc4-8926-4ce7c064c5de'),(27,'a68bacfb-a365-4fe5-916f-abb68983f815'),(27,'cb02a2a4-d19a-4b7a-99fe-2577f1914a3f'),(27,'dd0493cc-2041-4b14-adfe-c036abdbc9ad'),(27,'71c40e35-6d15-47c5-9112-db519f968f34'),(27,'ea3e677e-b256-4638-936c-0f4206dd8d7a'),(27,'b8df411b-50a5-447a-93e1-720fbf910673'),(27,'e1007129-b55f-4bef-a290-dd6e725442e0'),(27,'61fdcea8-b1a1-439d-bfa6-bc58d7e081df'),(27,'22bf8165-73bd-4525-b650-c1c14a4f0f8a'),(27,'db5ef715-9f83-461f-b800-e53692b3e6d0'),(27,'27108c13-fa86-4c7e-9222-0b13bf0f17fd'),(27,'02596b2d-0b0e-4e59-909f-9ad379e2b31b'),(27,'5f6762bd-bbf7-4f30-aac6-c2bfe66c399e'),(27,'d00a8ac7-8f78-4945-ba01-da14a06b7761'),(31,'ebf63739-3e31-40f8-8428-e4effbbeb0b9'),(32,'4ac71b1d-141c-4670-9fbf-5b2ba37af988');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','user1@example.com','password1','2023-05-24 21:17:47'),(2,'user2','user2@example.com','password2','2023-05-24 21:17:47'),(3,'user3','user3@example.com','password3','2023-05-24 21:17:47'),(4,'user4','user4@example.com','password4','2023-05-24 21:17:47'),(5,'user5','user5@example.com','password5','2023-05-24 21:17:47'),(6,'user6','user6@example.com','password6','2023-05-24 21:17:47'),(7,'user7','user7@example.com','password7','2023-05-24 21:17:47'),(8,'user8','user8@example.com','password8','2023-05-24 21:17:47'),(9,'user9','user9@example.com','password9','2023-05-24 21:17:47'),(10,'user10','user10@example.com','password10','2023-05-24 21:17:47'),(21,'lior1','klsjad','asd',NULL),(22,'lior3','dasd','$2b$12$fffixf2uT0eSbsT6zMvGMOXL5wPKWjwC/46O5I51AUGDv8DVd93Ai',NULL),(23,'lior7','lsajd','$2b$12$sD1iwUoOsmSR2TNftICaSee3kDNz5uW9WZtxUHkOQfo2y35p537.e',NULL),(24,'lior9','lsajd','$2b$12$rbuftMw0QkwtiEdZG8vWPecxlg1DBC9BxKuMs10itwgE52AK0h3MK',NULL),(25,'lior10','lsajd','$2b$12$juj.pTkS8NpYYsJmtRozT.NDRW3MecxNK8bKgWYK2F0teMdZIMO/O',NULL),(26,'lior11','lsajd','$2b$12$jTAQqh4Nl6tyiSx8p/0/QOTXvDwVUOLMoSqj3MxWmKmEBC2jlsr/i',NULL),(27,'yossi','123','$2b$12$quEfV6VPlrTn/2.HOrOBfug0K4bB/a5i.c7gUPQk/iGIy.wsQRnpC',NULL),(28,'dani','123','$2b$12$wZhyaYr5H9LWwOQ8tdii7utdJnh6pl5Ynf1h7kpCY9MzijeS7Bvgi',NULL),(29,'lani','123','$2b$12$WCXYIU4I708Yv928C9AVAetDcMzx94iqvTwj5NI6Yrt1WVOh/hmca',NULL),(30,'shim','123','$2b$12$dmNSdY.AVwC2ESHGGwqlCes5Oy3Jp8IwSCCPczsL4geiP0UnuNHuO',NULL),(31,'gil','123','$2b$12$cI3HCCI/uMcaRNKPhmuhT.B.NRXDTdbapYGzvq/PljqaACv8nTw/e',NULL),(32,'admin','admin','$2b$12$N.VGl7n63fdBwizDbsVSmeOhSAAIQLRPX37PZymtgxJNuk4uFjZUa',NULL),(33,'admin1','admin1','$2b$12$wSSTBa0YANgyzx.EYU5pIuAt0NkWtETb2SW6qIJSi59yIkkL7qX/.',NULL),(34,'admin2','123','$2b$12$HKsqODloV0Sfj7aE/Q96ruK7Xj0mIAhXEPERX8ZOYv/udWOVkNhOK',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-03 17:35:03
