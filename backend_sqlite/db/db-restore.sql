DROP TABLE IF EXISTS accounts;

CREATE TABLE `accounts` (
`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,
`owner_id` INTEGER DEFAULT NULL ,
`type` TEXT DEFAULT NULL ,
`wallet_limit` float DEFAULT '0',
`wallet_balance` float DEFAULT '0',
`restricted_transaction` TEXT DEFAULT 'none',
`allowed_transaction` TEXT DEFAULT 'all',
FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
FOREIGN KEY (`restricted_transaction`) REFERENCES `transaction_categories` (`category`)
);
DROP TABLE IF EXISTS quest;

CREATE TABLE `quest` (
`quest_id` INTEGER  NOT NULL ,
`assigned_to_id` INTEGER  DEFAULT NULL,
`assigned_by_id` INTEGER  DEFAULT NULL,
`transaction_id` INTEGER  DEFAULT NULL,
`quest_description` TEXT DEFAULT 'Task',
`transaction_value` INTEGER  DEFAULT NULL,
`completion` tinyINTEGER DEFAULT NULL,
`accepted` tinyINTEGER DEFAULT NULL,
PRIMARY KEY (`quest_id`)
);
DROP TABLE IF EXISTS transactions;

CREATE TABLE `transactions` (
`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,
`create_time` timestamp NOT NULL  ,
`category` TEXT DEFAULT NULL ,
`transaction_amount` float DEFAULT '0',
`payer_id` INTEGER DEFAULT NULL ,
`payee_id` INTEGER DEFAULT NULL ,
FOREIGN KEY (`category`) REFERENCES `transaction_categories` (`category`),
FOREIGN KEY (`payee_id`) REFERENCES `accounts` (`id`),
FOREIGN KEY (`payer_id`) REFERENCES `accounts` (`id`),
FOREIGN KEY (`category`) REFERENCES `transaction_categories` (`category`),
FOREIGN KEY (`category`) REFERENCES `transaction_categories` (`category`)
);
DROP TABLE IF EXISTS transaction_categories;

CREATE TABLE `transaction_categories` (
  `category` text NOT NULL PRIMARY KEY,
  `comment` text 
);

DROP TABLE IF EXISTS users;

CREATE TABLE `users` (
`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,
`create_time` datetime DEFAULT CURRENT_TIMESTAMP,
`update_time` datetime DEFAULT CURRENT_TIMESTAMP,
`first_name` TEXT DEFAULT NULL ,
`last_name` TEXT DEFAULT NULL ,
`mobile` INTEGER  DEFAULT NULL ,
`email` TEXT DEFAULT NULL ,
`login_id` TEXT DEFAULT NULL ,
`login_password` TEXT DEFAULT NULL ,
`user_type` TEXT DEFAULT NULL ,
`parent_id` INTEGER unsigned DEFAULT NULL 
);
INSERT INTO accounts(id,owner_id,type,wallet_limit,wallet_balance,restricted_transaction,allowed_transaction) VALUES(1,1,'system_inflow',NULL,999586,NULL,NULL),(2,2,'system_outflow',NULL,1000120,NULL,NULL),(3,3,'virtual_card',0,10,'FOOD',NULL),(5,1,'wallet',10,118,NULL,NULL),(6,5,'wallet',30,175,'DRINKS','all'),(7,6,'wallet',50,295,'GAME','all'),(10,69,'wallet',50,50,'null','all'),(11,71,'wallet',50,50,'null','all'),(12,72,'wallet',50,50,'null','all'),(13,73,'wallet',50,50,'null','all'),(14,74,'wallet',50,50,'null','all'),(15,75,'wallet',50,50,'null','all'),(16,76,'wallet',50,50,'null','all'),(17,77,'wallet',50,50,'null','all'),(18,38,'wallet',50,50,'null','all'),(19,83,'wallet',50,50,'null','all'),(20,85,'wallet',50,50,'null','all'),(21,87,'wallet',50,50,'null','all'),(22,88,'wallet',50,50,'null','all'),(23,92,'wallet',50,50,'null','all');
INSERT INTO transactions(id,create_time,category,transaction_amount,payer_id,payee_id) VALUES(1,'2021-11-28 23:03:32','SOURCE',500,1,3),(2,'2021-11-28 23:07:08','TRF',100,3,5),(3,'2021-10-12 23:06:48','GAME',30,5,2),(4,'2021-11-28 23:07:30','GAME',10,6,2),(6,'2021-11-28 23:07:43','FOOD',10,5,2),(7,'2021-11-28 23:07:54','GAME',15,3,2),(10,'2021-11-27 22:36:43','DRINKS',25,5,2),(11,'2021-11-27 22:39:11','GAME',70,5,2),(12,'2021-11-27 22:39:24','GAME',10,5,2),(13,'2021-09-07 23:38:18','FOOD',5,5,2),(14,'2021-11-28 17:29:22','GAME',10,6,2),(15,'2021-11-28 17:30:01','GAME',10,6,2),(17,'2021-11-29 00:19:17','FOOD',10,6,2),(18,'2021-11-29 13:53:06','FOOD',10,6,2),(24,'2021-11-29 20:10:42','BOOKS',100,1,5),(26,'2021-11-29 21:24:26','BOOKS',23,1,7),(30,'2021-11-29 22:24:47','BOOKS',20,1,1),(31,'2021-11-30 02:09:35','BOOKS',50,1,7),(32,'2021-11-30 02:19:52','BOOKS',23,1,5),(34,'2021-11-30 13:40:59','SOURCE',20,5,6),(35,'2021-11-30 14:44:40','DRINKS',30,1,1);
INSERT INTO transaction_categories(category,comment) VALUES('BOOKS',X'426f6f6b7320616e642073746174696f6e657279'),('DRINKS',X'6472696e6b73'),('FOOD',X'466f6f64'),('GAME',X'67616d65'),('null',X'6e756c6c'),('SOURCE',X'4d6f6e657920696e746f2073797374656d'),('TRANSPORT',X'5472616e73706f72746174696f6e'),('TRF',X'7472616e73666572');

INSERT INTO users(id,create_time,update_time,first_name,last_name,mobile,email,login_id,login_password,user_type,parent_id) VALUES(1,NULL,NULL,'test1','Sourceuser',123456,'akij@email.com','source','b','system',NULL),(2,NULL,NULL,'Spend','Spenduser',12345678,'spend@spend.com','spend','spend','system',NULL),(3,NULL,NULL,'John','Tan',64566545,'john@tan.com','johntan','johntan','parent',NULL),(5,'2021-11-26 20:07:19','2021-11-26 20:07:19','Lon','Goon',87623541,'undefined','Lon','123X','parent',NULL),(6,'2021-11-27 09:51:36','2021-11-27 09:51:36','Jan','Lee',45671234,'qwe@asd.com','jan','jan','child',5),(7,'2021-11-28 22:24:10','2021-11-28 22:24:10','Jim','Lim',87773541,'jim@bloggsville.com','Jim','jim','child',NULL),(23,'2021-11-29 10:46:30','2021-11-29 10:46:30',NULL,NULL,NULL,'undefined',NULL,'undefined',NULL,NULL),(27,'2021-11-29 11:24:21','2021-11-29 11:24:21','Alan','Lim',12345678,'alan@lim.com','alanlim','alanlim','parent',NULL),(28,'2021-11-29 11:26:43','2021-11-29 11:26:43','test','Lim',87873541,'test@bloggsville.com','test','test','child',NULL),(29,'2021-11-29 11:27:06','2021-11-29 11:27:06','Alan','Lim',12345678,'alan@lim.com','alanlim','alanlim','parent',NULL),(30,'2021-11-29 11:27:53','2021-11-29 11:27:53','test','Lim',87873541,'test@bloggsville.com','test','test','child',NULL),(31,'2021-11-29 11:30:20','2021-11-29 11:30:20','test','Lim',87873541,'test@bloggsville.com','test','test','child',NULL),(32,'2021-11-29 11:31:18','2021-11-29 11:31:18','Eric','Tan',12345678,'eric@tan.com','erictan','erictan','parent',NULL),(33,'2021-11-29 11:35:24','2021-11-29 11:35:24',NULL,NULL,NULL,'jest@bloggsville.com',NULL,'jest',NULL,NULL),(36,'2021-11-29 11:38:52','2021-11-29 11:38:52','Joe','Lim',56781234,'joe@lim.com','joelim','joelim','child',NULL),(38,'2021-11-29 12:40:44','2021-11-29 12:40:44','sest','sim',87873541,'sest@bloggsville.com','pest','sest','child',NULL),(39,'2021-11-29 12:41:28','2021-11-29 12:41:28','sest','sim',87873541,'sest@bloggsville.com','pest','sest','child',NULL),(40,'2021-11-29 12:53:14','2021-11-29 12:53:14','rest','lim',87873541,'rest@bloggsville.com','zest','nest','child',NULL),(41,'2021-11-29 13:05:25','2021-11-29 13:05:25','rest','lim',87873541,'rest@bloggsville.com','zest','nest','child',NULL),(42,'2021-11-29 13:24:31','2021-11-29 13:24:31','best','bim',87873541,'best@bloggsville.com','best','best','child',NULL),(43,'2021-11-29 13:25:58','2021-11-29 13:25:58','best','bim',87873541,'best@bloggsville.com','best','best','child',NULL),(44,'2021-11-29 13:31:25','2021-11-29 13:31:25',NULL,NULL,NULL,'test@test.com',NULL,'123!@#qwe!@#',NULL,NULL),(45,'2021-11-29 13:31:37','2021-11-29 13:31:37',NULL,NULL,NULL,'123@123.com',NULL,'123!@#qweQWE',NULL,NULL),(46,'2021-11-29 13:31:59','2021-11-29 13:31:59',NULL,NULL,NULL,'23@23.com',NULL,'123QWE123QWEqwe',NULL,NULL),(47,'2021-11-29 13:51:39','2021-11-29 13:51:39','Brian','Lee',56781234,'brian@lee.com','brianlee','brianlee','child',NULL),(48,'2021-11-29 14:01:47','2021-11-29 14:01:47','Brian','Lee',56781234,'brian@lee.com','brianlee','brianlee','child',NULL),(49,'2021-11-29 14:05:41','2021-11-29 14:05:41','Bill','Tan',56781111,'bill@tan.com','billtan','billtan','child',NULL),(50,'2021-11-29 14:10:02','2021-11-29 14:10:02','Jill','Lim',56781111,'jill@lim.com','jilllim','jilllim','child',NULL),(51,'2021-11-29 14:13:22','2021-11-29 14:13:22','June','Lee',56781111,'june@lee.com','junelee','junelee','child',NULL),(52,'2021-11-29 14:15:21','2021-11-29 14:15:21','Jerry','Koh',56781111,'jerry@koh.com','jerrykoh','jerrykoh','parent',NULL),(53,'2021-11-29 14:17:24','2021-11-29 14:17:24','Can','Run',56781111,'can@run.com','canrun','canrun','parent',NULL),(54,'2021-11-29 14:19:13','2021-11-29 14:19:13','Dom','Rose',56781111,'dom@rose.com','domrose','domrose','parent',NULL),(55,'2021-11-29 14:21:26','2021-11-29 14:21:26','Emm','Tan',56781111,'emm@tan.com','emmtan','emmtan','parent',NULL),(56,'2021-11-29 14:28:47','2021-11-29 14:28:47','Frank','Boon',56781111,'frank@boon.com','frankboon','frankboon','child',NULL),(57,'2021-11-29 14:32:39','2021-11-29 14:32:39','Gin','Ang',56781111,'gin@ang.com','ginang','ginang','child',NULL),(58,'2021-11-29 14:35:06','2021-11-29 14:35:06','Hope','Boon',56781111,'hope@boon.com','hopeboon','hopeboon','child',NULL),(59,'2021-11-29 14:40:43','2021-11-29 14:40:43','June','Lee',56781111,'june@lee.com','junelee','junelee','parent',NULL),(60,'2021-11-29 14:42:45','2021-11-29 14:42:45','Leroy','Tan',56781111,'leroy@tan.com','leroytan','leroytan','child',NULL),(61,'2021-11-29 14:48:05','2021-11-29 14:48:05','Karen','Ng',56781111,'karen@ng.com','karenng','karenng','child',NULL),(62,'2021-11-29 15:15:59','2021-11-29 15:15:59','Lily','Lee',56781111,'lilly@lee.com','lillylee','lillylee','child',NULL),(63,'2021-11-29 15:18:26','2021-11-29 15:18:26','Lily','Ng',56781111,'lilly@ng.com','lillyng','lillyng','child',NULL),(64,'2021-11-29 15:26:52','2021-11-29 15:26:52','Mile','Tan',56781111,'mile@tan.com','miletan','miletan','child',NULL),(65,'2021-11-29 15:27:30','2021-11-29 15:27:30','Mile','Tan',56781111,'mile@tan.com','miletan','miletan','child',NULL),(66,'2021-11-29 15:36:24','2021-11-29 15:36:24','Nigel','Lim',56781111,'nigel@lim.com','nigellim','nigellim','child',NULL),(67,'2021-11-29 15:37:09','2021-11-29 15:37:09','Nigel','Lim',56781111,'nigel@lim.com','nigellim','nigellim','child',NULL),(68,'2021-11-29 15:41:00','2021-11-29 15:41:00','Nigel','Lim',56781111,'nigel@lim.com','nigellim','nigellim','child',NULL),(69,'2021-11-29 15:47:58','2021-11-29 15:47:58','Orange','Tan',56781111,'orange@tan.com','orangetan','orangetan','child',NULL),(70,'2021-11-29 15:55:27','2021-11-29 15:55:27',NULL,NULL,NULL,'jest@bloggsville.com',NULL,'jest',NULL,NULL),(71,'2021-11-29 16:01:57','2021-11-29 16:01:57','Paul','Lim',56781111,'paul@lim.com','paullim','paullim','parent',NULL),(72,'2021-11-29 16:05:20','2021-11-29 16:05:20','Roy','Tan',56781111,'roy@tan.com','roytan','roytan','parent',NULL),(73,'2021-11-29 16:06:36','2021-11-29 16:06:36','Roy','Tan',56781111,'roy@tan.com','roytan','roytan','parent',NULL),(74,'2021-11-29 16:07:40','2021-11-29 16:07:40','Roy','Tan',56781111,'roy@tan.com','roytan','roytan','parent',NULL),(75,'2021-11-29 16:12:27','2021-11-29 16:12:27','Brian','Tan',56781234,'brian@tan.com','briantan','briantan','child',NULL),(76,'2021-11-29 16:16:08','2021-11-29 16:16:08','blest','blim',87873541,'blest@bloggsville.com','blest','blest','child',NULL),(77,'2021-11-29 16:21:45','2021-11-29 16:21:45',NULL,NULL,NULL,'pjaest@bloggsville.com',NULL,'pjaest',NULL,NULL),(78,'2021-11-29 23:24:47','2021-11-29 23:24:47',NULL,NULL,NULL,'123@creae.com',NULL,'123!@#qweQWE',NULL,NULL),(79,'2021-11-29 23:25:59','2021-11-29 23:25:59',NULL,NULL,NULL,'321@123.com',NULL,'Tresting123',NULL,NULL),(80,'2021-11-29 23:32:35','2021-11-29 23:32:35',NULL,NULL,NULL,'1234@1234.com',NULL,'Password123',NULL,NULL),(81,'2021-11-30 09:44:47','2021-11-30 09:44:47',NULL,NULL,NULL,'test5@test5.com',NULL,'12345!@#$%qwert',NULL,NULL),(82,'2021-11-30 09:47:21','2021-11-30 09:47:21',NULL,NULL,NULL,'test6@test6.com',NULL,'1234!@#$!@#$qwer',NULL,NULL),(83,'2021-11-30 09:53:57','2021-11-30 09:53:57',NULL,NULL,NULL,'undefined',NULL,'undefined',NULL,NULL),(84,'2021-11-30 09:56:46','2021-11-30 09:56:46',NULL,NULL,NULL,'jettest2@jet.com',NULL,'1234!@#$qwe',NULL,NULL),(85,'2021-11-30 10:09:47','2021-11-30 10:09:47','Zoe','Lee',56781111,'zoe@lee.com','zoelee','zoelee','parent',NULL),(86,'2021-11-30 10:16:13','2021-11-30 10:16:13',NULL,NULL,NULL,'test8@test8.com',NULL,'12345!@#$%qwer',NULL,NULL),(87,'2021-11-30 13:11:11','2021-11-30 13:11:11','test','Lim',87873541,'test@bloggsville.com','test','test','child',NULL),(88,'2021-11-30 13:13:27','2021-11-30 13:13:27','test','Lim',87873541,'test@bloggsville.com','test','test','undefined',NULL),(89,'2021-11-30 13:24:11','2021-11-30 13:24:11',NULL,NULL,NULL,'123123@asdasd.com',NULL,'123!@#qwe',NULL,NULL),(90,'2021-11-30 13:24:22','2021-11-30 13:24:22',NULL,NULL,NULL,'test@12321.com',NULL,'123!@#qwe!@#',NULL,NULL),(91,'2021-11-30 13:25:06','2021-11-30 13:25:06',NULL,NULL,NULL,'testing@qwe.com',NULL,'qweqw@#123',NULL,NULL),(92,'2021-11-30 14:22:14','2021-11-30 14:22:14','test','Lim',87873541,'testAPI@testAPI.com','test','test','undefined',NULL),(93,'2021-11-30 14:46:07','2021-11-30 14:46:07',NULL,NULL,NULL,'testjet@test.com',NULL,'123!@#123!@#qwe',NULL,NULL);DROP PROCEDURE IF EXISTS CheckRestriction;
