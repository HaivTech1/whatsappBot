-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: apiwa
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `tbl_contacts`
--

DROP TABLE IF EXISTS `tbl_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hp` varchar(255) NOT NULL,
  `name` longtext NOT NULL,
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contacts`
--

LOCK TABLES `tbl_contacts` WRITE;
/*!40000 ALTER TABLE `tbl_contacts` DISABLE KEYS */;
INSERT INTO `tbl_contacts` VALUES (1,'082165561175','Imam wasmawi'),(2,'082165561175','Imam aja'),(3,'082165561175','joki');
/*!40000 ALTER TABLE `tbl_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_groups`
--

DROP TABLE IF EXISTS `tbl_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_group` text NOT NULL,
  `nama_group` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `userid` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_groups`
--

LOCK TABLES `tbl_groups` WRITE;
/*!40000 ALTER TABLE `tbl_groups` DISABLE KEYS */;
INSERT INTO `tbl_groups` VALUES (1,'6282165561175-1598343953@g.us','Cloud Games','2021-05-07 17:00:00','2021-05-07 17:00:00','admin@admin.ac.id');
/*!40000 ALTER TABLE `tbl_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_menu`
--

DROP TABLE IF EXISTS `tbl_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` longtext NOT NULL,
  `name` longtext NOT NULL,
  `icons` longtext NOT NULL,
  `status` longtext,
  `show` varchar(255) DEFAULT NULL,
  `urutan` int DEFAULT NULL,
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_menu`
--

LOCK TABLES `tbl_menu` WRITE;
/*!40000 ALTER TABLE `tbl_menu` DISABLE KEYS */;
INSERT INTO `tbl_menu` VALUES (1,'home','Home','fa fa-home','user','Y',1),(2,'message','Outbox','fa fa-envelope','user','Y',2),(3,'inbox','Inbox','fa fa-inbox ','user','Y',3),(4,'reply','Auto-Reply','fa fa-send','user','Y',4),(5,'broadcast','Broadcast','fa fa-volume-up','user','Y',5),(6,'sendwa','Send','fa fa-whatsapp','user','Y',6),(7,'schedule','Schedule','fa fa-calendar-o','user','Y',7),(8,'kontak','Contact','fa fa-vcard-o','user','Y',8),(9,'configuration','Scan Qr','fa fa-cog','user','Y',9),(10,'listgroups','Groups','fa fa-object-group','user','Y',10),(11,'api/v1/docs/','API Docs','fa fa-file','user','Y',11),(12,'users','Users','fa fa-users','admin','Y',12),(13,'menu','Menu','fa fa-cogs','admin','Y',13),(18,'about','About','fa fa-info','user','Y',16),(19,'logout','Logout','fa fa-lock','user','Y',17);
/*!40000 ALTER TABLE `tbl_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_message`
--

DROP TABLE IF EXISTS `tbl_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_message` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) DEFAULT NULL,
  `message` text,
  `sender` varchar(255) NOT NULL,
  `status` longtext NOT NULL,
  `desc` longtext NOT NULL,
  `userid` longtext,
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1228 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_message`
--

LOCK TABLES `tbl_message` WRITE;
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
INSERT INTO `tbl_message` VALUES (1198,'6282165561175@c.us','adfafadf','pgvbpkby','terSend','message','admin@gmail.com'),(1199,'6282165561175@c.us','kjhkjhkj','pgvbpkby','terSend','message','admin@gmail.com'),(1200,'6282165561175@c.us','sfgsgfsfgfs','pgvbpkby','terSend','message','admin@gmail.com'),(1201,'6282165561175@c.us','adf','pdduzzen','terSend','message','admin@gmail.com'),(1202,'6282165561175@c.us',',m','birzeprf','terSend','message','admin@gmail.com'),(1203,'6282165561175@c.us','mmm','birzeprf','terSend','message','admin@gmail.com'),(1204,'6282370586863@c.us','i love','birzeprf','terSend','message','admin@gmail.com'),(1205,'6282165561175@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1206,'6282370586863@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1207,'6285270391713@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1208,'6281360759442@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1209,'6281262887452@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1210,'6281332708452@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1211,'6281260465144@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1212,'6285212265242@c.us','Ini Tester Schedule - 2022-08-02 18:39','birzeprf','terSend','message','admin@gmail.com'),(1213,'6282165561175@c.us','m','birzeprf','terSend','message','admin@gmail.com'),(1214,'6281360759442@c.us','caxc','birzeprf','terSend','message','admin@gmail.com'),(1215,'6282165561175@c.us','zcz','nxfkbscw','terSend','message','admin@gmail.com'),(1216,'6282165561175@c.us','asdafds','yrkiqgjt','terSend','message','admin@gmail.com'),(1217,'6282165561175@c.us','n','yrkiqgjt','terSend','message','admin@gmail.com'),(1218,'6285156846593@c.us','cekk','aploppzk','terSend','message','admin@gmail.com'),(1219,'6282165561175@c.us','kjkj','dzmvkudd','terSend','message','admin@gmail.com'),(1220,'6282165561175@c.us',',kk','dzmvkudd','terSend','message','admin@gmail.com'),(1221,'6282165561175@c.us','adf','dzmvkudd','terSend','message','admin@gmail.com'),(1222,'6282165561175@c.us','cuma tester saja','prathnxk','terSend','message','auxcine03@gmail.com'),(1223,'6281260465144@c.us','Test Aplikasi dekk ..','prathnxk','terSend','message','auxcine03@gmail.com'),(1224,'6282165561175@c.us','aplikasi kasi whatsapp scedule - 2022-09-07 20:06','prathnxk','terSend','message','auxcine03@gmail.com'),(1225,'6281260465144@c.us','aplikasi kasi whatsapp scedule - 2022-09-07 20:06','prathnxk','terSend','message','auxcine03@gmail.com'),(1226,'6282165561175@c.us','test - 2022-09-07 20:10','prathnxk','terSend','message','auxcine03@gmail.com'),(1227,'6281260465144@c.us','test - 2022-09-07 20:10','prathnxk','terSend','message','auxcine03@gmail.com');
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_schedules`
--

DROP TABLE IF EXISTS `tbl_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_schedules` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `sender` text NOT NULL,
  `message` longtext NOT NULL,
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_schedules`
--

LOCK TABLES `tbl_schedules` WRITE;
/*!40000 ALTER TABLE `tbl_schedules` DISABLE KEYS */;
INSERT INTO `tbl_schedules` VALUES (1,'2022-05-23 18:22:00','imam','Ini dari imam wasmawi'),(2,'2022-05-23 18:22:00','imam','Ini dari imam wasmawi'),(3,'2022-05-23 18:22:00','imam','Ini dari imam wasmawi'),(4,'2022-05-23 18:22:00','imam','Ini dari imam wasmawi'),(5,'2022-05-23 18:22:00','imam','Ini dari imam wasmawi');
/*!40000 ALTER TABLE `tbl_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('user','admin') NOT NULL,
  `image` longtext,
  `quota` int NOT NULL,
  `devices` int NOT NULL,
  UNIQUE KEY `unique_id` (`id`),
  KEY `index` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (28,'Administrator','admin@gmail.com','$2b$10$8/.Vkr2HaUTnqpqkqLc.zeznVMEsaXQ2NiQagqaGlCmYrTL7rB1Gm','2022-09-03 14:40:33','2021-05-07 17:00:00','admin','profile.jpg',978,5),(29,'Joki Ananta','joki@gmail.com','$2b$10$kUB2uGPuWvVn306NZZpOYuHVnVomshrtUHtzXnMpZx3Z5XThH6wsC','2022-07-22 14:22:41','2021-05-07 17:00:00','user','profile.jpg',10,5),(30,'Landak','landak@gmail.com','$2b$10$QdUgbjgTTP.KaxTMkeTyUOmm/kFs9elwV.5RXk1akAWaL3Wsm6HI2','2022-07-22 14:22:41','2021-05-07 17:00:00','user','arashmil.jpg',10,5),(33,'andie1','andie1@gmail.com','$2b$10$cvDz1SonTMp2Nw/5xM.bPO2Do6alBG7e2e5UQYwXf5oPA9vaIRIbi','2021-05-07 17:00:00','2021-05-07 17:00:00','user','arashmil.jpg',10,3),(34,'Joki','auxcine03@gmail.com','$2b$10$virOiGvzvUTuQoNAgmvG2eCkoKT92qi0DhMni/FLrHSsTgI0Aq4S2','2022-09-07 13:11:08','2021-05-07 17:00:00','user','arashmil.jpg',999999999,99);
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wa`
--

DROP TABLE IF EXISTS `tbl_wa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_wa` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL,
  `idwa` varchar(200) DEFAULT NULL,
  UNIQUE KEY `unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=328 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wa`
--

LOCK TABLES `tbl_wa` WRITE;
/*!40000 ALTER TABLE `tbl_wa` DISABLE KEYS */;
INSERT INTO `tbl_wa` VALUES (124,'admin@gmail.com','imam','whatsapp-session-imam_APgyj.json','imam_APgyj'),(125,'admin@gmail.com','imam','whatsapp-session-imam_y5pnl.json','imam_y5pnl'),(126,'admin@gmail.com','imam','whatsapp-session-imam_zc3oq.json','imam_zc3oq'),(127,'admin@gmail.com','imam','whatsapp-session-qlmc1z6q6fgb.json','qlmc1z6q6fgb'),(128,'admin@gmail.com','imam wasamwi','whatsapp-session-bm95tcmxkode.json','bm95tcmxkode'),(129,'admin@gmail.com','imam wasmawi','whatsapp-session-8cmzaxoa4qpf.json','8cmzaxoa4qpf'),(130,'admin@gmail.com','imam','whatsapp-session-puu160su.json','puu160su'),(131,'admin@gmail.com','imam','whatsapp-session-sxotjnnb.json','sxotjnnb'),(132,'admin@gmail.com','bacot','whatsapp-session-sezycovr.json','sezycovr'),(133,'admin@gmail.com','im','whatsapp-session-ohvedeld.json','ohvedeld'),(134,'admin@gmail.com','kmkm','whatsapp-session-hvmcnuzc.json','hvmcnuzc'),(135,'admin@gmail.com','imam wasmawi','whatsapp-session-rjoqkrey.json','rjoqkrey'),(136,'admin@gmail.com','pdai','whatsapp-session-qbdjuech.json','qbdjuech'),(137,'admin@gmail.com','joki','whatsapp-session-pbqzmkky.json','pbqzmkky'),(138,'admin@gmail.com','Administrator 2','whatsapp-session-ysjzamzt.json','ysjzamzt'),(139,'admin@gmail.com','imam','whatsapp-session-impqycvh.json','impqycvh'),(140,'admin@gmail.com','imam','whatsapp-session-bryihutp.json','bryihutp'),(141,'admin@gmail.com','imam wasmawi','whatsapp-session-jyzhwwjy.json','jyzhwwjy'),(142,'admin@gmail.com','Admin 2','whatsapp-session-kqycmqnz.json','kqycmqnz'),(143,'admin@gmail.com','admin 3','whatsapp-session-fftqusxl.json','fftqusxl'),(144,'admin@gmail.com','imam','whatsapp-session-ciizhswd.json','ciizhswd'),(145,'admin@gmail.com','imam wasmawi','whatsapp-session-aexzkfhl.json','aexzkfhl'),(146,'admin@gmail.com','admin 2','whatsapp-session-nbyvipip.json','nbyvipip'),(147,'admin@gmail.com','imam wasmawi','whatsapp-session-yxeyhnts.json','yxeyhnts'),(148,'admin@gmail.com','imam wasamwi','whatsapp-session-pcovapks.json','pcovapks'),(149,'admin@gmail.com','imam wasmawi','whatsapp-session-xplybikj.json','xplybikj'),(150,'admin@gmail.com','imam wasamwi','whatsapp-session-sonhlfrx.json','sonhlfrx'),(151,'admin@gmail.com','imam wasmawi','whatsapp-session-ythjkmnk.json','ythjkmnk'),(152,'admin@gmail.com','imam','whatsapp-session-coghvvjt.json','coghvvjt'),(153,'admin@gmail.com','imam wasmawi','whatsapp-session-hhcjuvzz.json','hhcjuvzz'),(154,'admin@gmail.com','imam wasmawi','whatsapp-session-stqijnek.json','stqijnek'),(155,'admin@gmail.com','imam','whatsapp-session-wwrosnfu.json','wwrosnfu'),(156,'admin@gmail.com','imam wasmawi','whatsapp-session-wwejvdiv.json','wwejvdiv'),(157,'admin@gmail.com','imam','whatsapp-session-qmxuslwh.json','qmxuslwh'),(158,'admin@gmail.com','imam wasmawi','whatsapp-session-apgyamnf.json','apgyamnf'),(159,'admin@gmail.com','imam wasmawi','whatsapp-session-qcjcqpxz.json','qcjcqpxz'),(160,'admin@gmail.com','imam','whatsapp-session-pdowvktd.json','pdowvktd'),(161,'admin@admin.ac.id','imam wasmawi','whatsapp-session-atonqmrb.json','atonqmrb'),(162,'admin@admin.ac.id','imam wasmawi','whatsapp-session-raazkjsb.json','raazkjsb'),(163,'admin@admin.ac.id','imam wasamwi','whatsapp-session-eoygwlyn.json','eoygwlyn'),(164,'admin@admin.ac.id','imnmnn','whatsapp-session-yvqxgscj.json','yvqxgscj'),(165,'admin@admin.ac.id','adadadad','whatsapp-session-kiwmvcnv.json','kiwmvcnv'),(166,'admin@admin.ac.id','imam wasmawi','whatsapp-session-pswuembt.json','pswuembt'),(167,'admin@admin.ac.id','imam wasmawi','whatsapp-session-iawmkpap.json','iawmkpap'),(168,'admin@admin.ac.id','imam wasmawi','whatsapp-session-ltvywzrf.json','ltvywzrf'),(169,'admin@admin.ac.id','imam wasmawi','whatsapp-session-fsuqiakj.json','fsuqiakj'),(170,'admin@admin.ac.id','imam wasmawi','whatsapp-session-btldmhjd.json','btldmhjd'),(171,'admin@admin.ac.id','imam wasmawi','whatsapp-session-awvkyjaq.json','awvkyjaq'),(172,'admin@admin.ac.id','sfsgsfgsfg','whatsapp-session-qjnzcvtk.json','qjnzcvtk'),(173,'admin@admin.ac.id','adfadfadfafd','whatsapp-session-hcuolppl.json','hcuolppl'),(174,'admin@admin.ac.id','imam wasmawi','whatsapp-session-ufcndwsq.json','ufcndwsq'),(175,'admin@admin.ac.id','082165561175','whatsapp-session-knxzigyz.json','knxzigyz'),(176,'admin@admin.ac.id','082165561175','whatsapp-session-yeeosflg.json','yeeosflg'),(177,'admin@admin.ac.id','082165561175','whatsapp-session-cdwjzoha.json','cdwjzoha'),(178,'admin@admin.ac.id','082165561175','whatsapp-session-gyaosxew.json','gyaosxew'),(179,'admin@admin.ac.id','082165561175','whatsapp-session-xnupmxex.json','xnupmxex'),(180,'admin@admin.ac.id','082165561175','whatsapp-session-brzxlpgs.json','brzxlpgs'),(181,'admin@admin.ac.id','082165561176','whatsapp-session-kfiulpqi.json','kfiulpqi'),(182,'admin@admin.ac.id','082165561175','whatsapp-session-zpyfhqnm.json','zpyfhqnm'),(183,'admin@admin.ac.id','082165561175','whatsapp-session-bedwjabt.json','bedwjabt'),(184,'admin@admin.ac.id','082165561175','whatsapp-session-wohgzmrd.json','wohgzmrd'),(185,'admin@admin.ac.id','082165561175','whatsapp-session-vlzwgfgt.json','vlzwgfgt'),(186,'admin@admin.ac.id','082165561175','whatsapp-session-lbfpidrb.json','lbfpidrb'),(187,'admin@admin.ac.id','082165561175','whatsapp-session-qhzcbgqp.json','qhzcbgqp'),(188,'admin@admin.ac.id','082165561175','whatsapp-session-ccuoiped.json','ccuoiped'),(189,'admin@admin.ac.id','082165561175','whatsapp-session-jcgfzhaf.json','jcgfzhaf'),(190,'admin@admin.ac.id','082165561175','whatsapp-session-djzxhlcw.json','djzxhlcw'),(191,'admin@admin.ac.id','082165561175','whatsapp-session-zarwffnt.json','zarwffnt'),(192,'admin@admin.ac.id','082165561175','whatsapp-session-xobmrwig.json','xobmrwig'),(193,'admin@admin.ac.id','082165561175','whatsapp-session-bugyvxir.json','bugyvxir'),(194,'admin@admin.ac.id','082165561175','whatsapp-session-atpyhbua.json','atpyhbua'),(195,'admin@admin.ac.id','082165561175','whatsapp-session-igfdcqsd.json','igfdcqsd'),(196,'admin@admin.ac.id','082165561175','whatsapp-session-nuyywxft.json','nuyywxft'),(197,'admin@admin.ac.id','082165561175','whatsapp-session-fcatpgen.json','fcatpgen'),(198,'admin@admin.ac.id','082165561175','whatsapp-session-khydrtsj.json','khydrtsj'),(199,'admin@admin.ac.id','082165561175','whatsapp-session-cqbtqhng.json','cqbtqhng'),(200,'admin@admin.ac.id','082165561175','whatsapp-session-obemgxul.json','obemgxul'),(201,'admin@admin.ac.id','082165561175','whatsapp-session-adjelpss.json','adjelpss'),(202,'admin@admin.ac.id','082165561175','whatsapp-session-wptifoob.json','wptifoob'),(203,'admin@admin.ac.id','082165561175','whatsapp-session-rdjqldmc.json','rdjqldmc'),(204,'admin@admin.ac.id','082165561175','whatsapp-session-wammncwd.json','wammncwd'),(205,'admin@admin.ac.id','082165561175','whatsapp-session-trbsemca.json','trbsemca'),(206,'admin@admin.ac.id','082165561175','whatsapp-session-nmhrflta.json','nmhrflta'),(207,'admin@admin.ac.id','082165561175','whatsapp-session-bbjauqkl.json','bbjauqkl'),(208,'admin@admin.ac.id','082165561175','whatsapp-session-xqyovyty.json','xqyovyty'),(209,'admin@admin.ac.id','082165561175','whatsapp-session-qnrwvtcm.json','qnrwvtcm'),(210,'admin@admin.ac.id','082165561175','whatsapp-session-tmahlocz.json','tmahlocz'),(211,'admin@admin.ac.id','082165561175','whatsapp-session-dieoxgvc.json','dieoxgvc'),(212,'admin@admin.ac.id','LKJLKLKJL','whatsapp-session-kgasoimw.json','kgasoimw'),(213,'admin@admin.ac.id','iuhiuhi','whatsapp-session-eyguagjv.json','eyguagjv'),(214,'admin@admin.ac.id','lklkkljljlk','whatsapp-session-pgvpdbkm.json','pgvpdbkm'),(215,'admin@admin.ac.id','082165561175','whatsapp-session-zjnfhvsz.json','zjnfhvsz'),(216,'admin@admin.ac.id','dafafadf','whatsapp-session-baexsbtn.json','baexsbtn'),(217,'admin@admin.ac.id','082165561175','whatsapp-session-dqoevsom.json','dqoevsom'),(218,'admin@admin.ac.id','adfadf','whatsapp-session-dmpeihea.json','dmpeihea'),(219,'admin@admin.ac.id','082165561175','whatsapp-session-wvemqdbj.json','wvemqdbj'),(220,'admin@admin.ac.id','082165561175','whatsapp-session-nzzqtaki.json','nzzqtaki'),(221,'admin@admin.ac.id','adfadfadf','whatsapp-session-abrfnyup.json','abrfnyup'),(222,'admin@admin.ac.id','adfadfadfadf','whatsapp-session-ejzxamci.json','ejzxamci'),(223,'admin@admin.ac.id','082165561175','whatsapp-session-cmggcfxe.json','cmggcfxe'),(224,'admin@admin.ac.id','082165561175','whatsapp-session-sidbuzta.json','sidbuzta'),(225,'admin@admin.ac.id','ADADAD','whatsapp-session-wjakkymk.json','wjakkymk'),(226,'admin@admin.ac.id','adfadfadf','whatsapp-session-sznphziz.json','sznphziz'),(227,'admin@admin.ac.id','adadadad','whatsapp-session-reihrkkr.json','reihrkkr'),(228,'admin@admin.ac.id','082165561175','whatsapp-session-xbbrduno.json','xbbrduno'),(229,'admin@admin.ac.id','082165561175','whatsapp-session-riqdboxe.json','riqdboxe'),(230,'admin@admin.ac.id','082165561175','whatsapp-session-dosrweck.json','dosrweck'),(231,'admin@admin.ac.id','082165561175','whatsapp-session-omygkyhp.json','omygkyhp'),(232,'admin@admin.ac.id','082165561175','whatsapp-session-linyalma.json','linyalma'),(233,'admin@admin.ac.id','134123414134','whatsapp-session-ohdapizn.json','ohdapizn'),(234,'admin@admin.ac.id','082165561175','whatsapp-session-mnexttph.json','mnexttph'),(235,'admin@admin.ac.id','082165561175','whatsapp-session-tdablfud.json','tdablfud'),(236,'admin@admin.ac.id','082165561175','whatsapp-session-dxkxjuwj.json','dxkxjuwj'),(237,'admin@admin.ac.id','082165561175','whatsapp-session-badjggsh.json','badjggsh'),(238,'admin@admin.ac.id','082165561175','whatsapp-session-mglvsnsp.json','mglvsnsp'),(239,'admin@admin.ac.id','082165561175','whatsapp-session-alswyqib.json','alswyqib'),(240,'admin@admin.ac.id','jkoikjoio','whatsapp-session-ukwszibf.json','ukwszibf'),(241,'admin@admin.ac.id','082165561175','whatsapp-session-vjvruatr.json','vjvruatr'),(242,'admin@admin.ac.id','oioijoijoij','whatsapp-session-zuzmlhlj.json','zuzmlhlj'),(243,'admin@admin.ac.id','jknlknlnlknlkn','whatsapp-session-fwqjcrbp.json','fwqjcrbp'),(244,'admin@admin.ac.id','082165561175','whatsapp-session-qtzlraxn.json','qtzlraxn'),(245,'admin@admin.ac.id','082165561175','whatsapp-session-jcqlhkvk.json','jcqlhkvk'),(246,'admin@admin.ac.id','082165561175','whatsapp-session-zccxhunx.json','zccxhunx'),(247,'admin@admin.ac.id','082165561175','whatsapp-session-brxpdsbb.json','brxpdsbb'),(248,'admin@admin.ac.id','082165561175','whatsapp-session-ugzgxksa.json','ugzgxksa'),(249,'admin@admin.ac.id','082165561175','whatsapp-session-fqbeorsw.json','fqbeorsw'),(250,'admin@admin.ac.id','082165561175','whatsapp-session-dxvfdyjs.json','dxvfdyjs'),(251,'admin@admin.ac.id','082165561175','whatsapp-session-bmyxslte.json','bmyxslte'),(252,'admin@admin.ac.id','082165561175','whatsapp-session-lvzyxzic.json','lvzyxzic'),(253,'admin@admin.ac.id','082165561175','whatsapp-session-gohchmcu.json','gohchmcu'),(254,'admin@admin.ac.id','082165561175','whatsapp-session-ncigukgt.json','ncigukgt'),(255,'admin@admin.ac.id','082165561175','whatsapp-session-vjptwgpv.json','vjptwgpv'),(256,'admin@admin.ac.id','0821655677','whatsapp-session-usvklesn.json','usvklesn'),(257,'admin@admin.ac.id','adfafadfadf','whatsapp-session-mkilfagq.json','mkilfagq'),(258,'jodi@gmail.com','adadfadfadfadf','whatsapp-session-jxlqrqzs.json','jxlqrqzs'),(259,'jodi@gmail.com','13121313','whatsapp-session-ulyljvrv.json','ulyljvrv'),(260,'jodi@gmail.com','082165561175','whatsapp-session-mnddvfoa.json','mnddvfoa'),(261,'jodi@gmail.com','087363737163','whatsapp-session-yxxptpma.json','yxxptpma'),(262,'jodi@gmail.com','082165561175','whatsapp-session-tpdahbbi.json','tpdahbbi'),(263,'jodi@gmail.com','0856465465','whatsapp-session-xecouvlw.json','xecouvlw'),(264,'admin@admin.ac.id','imam wasmawi ','whatsapp-session-oqzmokne.json','oqzmokne'),(265,'admin@admin.ac.id','082165561175','whatsapp-session-totfzgph.json','totfzgph'),(266,'pdai@uma.ac.id','082165561175','whatsapp-session-fokjxevp.json','fokjxevp'),(267,'admin@admin.ac.id','082165561175','whatsapp-session-dzuqlzje.json','dzuqlzje'),(268,'admin@admin.ac.id','082165561175','whatsapp-session-rrewjmse.json','rrewjmse'),(269,'admin@admin.ac.id','imam wasamwi','whatsapp-session-zwrjtntz.json','zwrjtntz'),(270,'admin@admin.ac.id','imam','whatsapp-session-vpmkxwug.json','vpmkxwug'),(271,'admin@gmail.com','imam wasmawi','whatsapp-session-dlitjhyj.json','dlitjhyj'),(272,'admin@gmail.com','082165561175','whatsapp-session-ctrtlgsc.json','ctrtlgsc'),(273,'admin@gmail.com','imam','whatsapp-session-vlrcsvvp.json','vlrcsvvp'),(274,'admin@gmail.com','imam 2','whatsapp-session-ccpdeeao.json','ccpdeeao'),(275,'admin@gmail.com','imam','whatsapp-session-vylzipaw.json','vylzipaw'),(276,'admin@gmail.com','082165561175','whatsapp-session-fpbbobgy.json','fpbbobgy'),(277,'admin@gmail.com','iuiuiuiuiuiu','whatsapp-session-uvvcwgbl.json','uvvcwgbl'),(278,'admin@gmail.com','082165561175','whatsapp-session-xvqrqitu.json','xvqrqitu'),(279,'admin@gmail.com','082165561175 (Imam)','whatsapp-session-vgwlxtly.json','vgwlxtly'),(280,'admin@gmail.com','imam','whatsapp-session-kzwywdgb.json','kzwywdgb'),(281,'admin@gmail.com','adfadf','whatsapp-session-icdizcix.json','icdizcix'),(282,'admin@gmail.com','sadfasfdsaf','whatsapp-session-szvwmduz.json','szvwmduz'),(283,'admin@gmail.com','sadfsadfsadf','whatsapp-session-eankttwt.json','eankttwt'),(284,'admin@gmail.com','sadfsadf','whatsapp-session-yiheszvp.json','yiheszvp'),(285,'admin@gmail.com','imam wasmawi','whatsapp-session-bnxuqpyy.json','bnxuqpyy'),(286,'bobi@uma.ac.id','adfadf','whatsapp-session-frdtwhbp.json','frdtwhbp'),(287,'bobi@uma.ac.id','adfadf','whatsapp-session-ncupvozz.json','ncupvozz'),(288,'admin@gmail.com','imam wasmawi','whatsapp-session-gstifjnu.json','gstifjnu'),(289,'admin@gmail.com','joki','whatsapp-session-mkeygvno.json','mkeygvno'),(290,'admin@gmail.com','boca','whatsapp-session-ivcaytev.json','ivcaytev'),(291,'admin@gmail.com','Imam Wasmawi','whatsapp-session-qgwzvsve.json','qgwzvsve'),(292,'admin@gmail.com','082165561178','whatsapp-session-pxgygnqt.json','pxgygnqt'),(293,'admin@gmail.com','082176713813','whatsapp-session-kpkigpgt.json','kpkigpgt'),(294,'admin@gmail.com','082165561175','whatsapp-session-fuwhetdf.json','fuwhetdf'),(295,'admin@gmail.com','082370586863','whatsapp-session-zqqaauuj.json','zqqaauuj'),(296,'admin@gmail.com','082165561175','whatsapp-session-ymuatgyx.json','ymuatgyx'),(297,'admin@gmail.com','082165561175','whatsapp-session-mpycwpxx.json','mpycwpxx'),(298,'admin@gmail.com','082165561175','whatsapp-session-nlsgowwb.json','nlsgowwb'),(299,'admin@gmail.com','082165561175','whatsapp-session-ndfiprrg.json','ndfiprrg'),(300,'admin@gmail.com','082165561175','whatsapp-session-ybdlaidq.json','ybdlaidq'),(301,'admin@gmail.com','082165561175','whatsapp-session-phsonqkz.json','phsonqkz'),(302,'admin@gmail.com','082165561175','whatsapp-session-amljtvbj.json','amljtvbj'),(303,'admin@gmail.com','082165561175','whatsapp-session-fzgwyjlo.json','fzgwyjlo'),(304,'admin@gmail.com','082165561175','whatsapp-session-kgnloxto.json','kgnloxto'),(305,'admin@gmail.com','082165561175','whatsapp-session-pbapudfj.json','pbapudfj'),(306,'admin@gmail.com','082165561175','whatsapp-session-acywjwdc.json','acywjwdc'),(307,'admin@gmail.com','082165561175','whatsapp-session-vjxplrll.json','vjxplrll'),(308,'admin@gmail.com','082165561175','whatsapp-session-ruyaegwz.json','ruyaegwz'),(309,'admin@gmail.com','081260465144','whatsapp-session-mbrdzkcz.json','mbrdzkcz'),(310,'admin@gmail.com','082165561175','whatsapp-session-pgvbpkby.json','pgvbpkby'),(311,'pdai@uma.ac.id','081262887452','whatsapp-session-zxwsrjrp.json','zxwsrjrp'),(312,'pdai@uma.ac.id','082370586863','whatsapp-session-oavqpfwj.json','oavqpfwj'),(313,'pdai@uma.ac.id','081262887452','whatsapp-session-xtsdxwlg.json','xtsdxwlg'),(314,'pdai@uma.ac.id','081360759442','whatsapp-session-jrveafpm.json','jrveafpm'),(315,'admin@gmail.com','082165561175','whatsapp-session-pdduzzen.json','pdduzzen'),(316,'admin@gmail.com','082165561175','whatsapp-session-birzeprf.json','birzeprf'),(317,'admin@gmail.com','085270391713','whatsapp-session-cuispvwo.json','cuispvwo'),(318,'admin@gmail.com','082165561175','whatsapp-session-vjwgdjcc.json','vjwgdjcc'),(319,'admin@gmail.com','082165561175','whatsapp-session-nxfkbscw.json','nxfkbscw'),(320,'admin@gmail.com','082165561175','whatsapp-session-yrkiqgjt.json','yrkiqgjt'),(321,'admin@gmail.com','082165561175','whatsapp-session-hgjfucip.json','hgjfucip'),(322,'admin@gmail.com','082165561175','whatsapp-session-hwzlspod.json','hwzlspod'),(323,'admin@gmail.com','082165561175','whatsapp-session-kgbeupqx.json','kgbeupqx'),(324,'admin@gmail.com','082165561175','whatsapp-session-lvhatqmz.json','lvhatqmz'),(325,'admin@gmail.com','082165561175','whatsapp-session-aploppzk.json','aploppzk'),(326,'admin@gmail.com','082165561175','whatsapp-session-dzmvkudd.json','dzmvkudd'),(327,'auxcine03@gmail.com','082165561132','whatsapp-session-prathnxk.json','prathnxk');
/*!40000 ALTER TABLE `tbl_wa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-10 21:33:05
