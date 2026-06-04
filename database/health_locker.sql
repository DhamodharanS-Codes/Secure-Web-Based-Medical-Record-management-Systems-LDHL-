-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: health_locker
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `audit_alerts`
--

DROP TABLE IF EXISTS `audit_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_alerts` (
  `alert_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `alert_type` varchar(100) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`alert_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_alerts`
--

LOCK TABLES `audit_alerts` WRITE;
/*!40000 ALTER TABLE `audit_alerts` DISABLE KEYS */;
INSERT INTO `audit_alerts` VALUES (1,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-03 04:18:36'),(2,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-03 04:43:33'),(3,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 11:31:56'),(4,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 11:47:42'),(5,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 11:58:39'),(6,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 12:34:15'),(7,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 13:09:46'),(8,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 13:24:47'),(9,2,'patient','HIGH_SENSITIVITY_ACTION','Medical record uploaded','2026-02-04 13:25:57'),(10,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-04 13:37:04'),(11,2,'patient','HIGH_SENSITIVITY_ACTION','Medical record uploaded','2026-02-04 13:38:32'),(12,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-05 03:15:16'),(13,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-05 04:57:19'),(14,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-05 06:05:29'),(15,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-08 07:15:22'),(16,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-08 07:26:55'),(17,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-08 07:51:15'),(18,1,'admin','SYSTEM_TEST','Audit alert system test','2026-02-08 08:18:59'),(19,6,'admin','FAILED_LOGIN','Incorrect password entered','2026-02-11 06:21:31'),(20,0,'unknown','FAILED_LOGIN','Login attempt with invalid email: admin@test.com','2026-02-11 11:58:06'),(21,0,'unknown','FAILED_LOGIN','Login attempt with invalid email: admin@test.com','2026-02-11 11:58:10'),(22,0,'unknown','FAILED_LOGIN','Login attempt with invalid email: admin@email.com','2026-02-11 12:01:08'),(23,2,'patient','FAILED_LOGIN','Incorrect password entered','2026-02-11 12:25:24'),(24,2,'patient','FAILED_LOGIN','Incorrect password entered','2026-02-11 12:25:56'),(25,2,'patient','FAILED_LOGIN','Incorrect password entered','2026-02-11 12:26:53'),(26,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 12:27:34'),(27,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 12:28:00'),(28,1,'admin','FAILED_LOGIN','Incorrect password entered','2026-02-11 12:30:10'),(29,2,'patient','FAILED_LOGIN','Incorrect password entered','2026-02-11 13:00:40'),(30,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 18:01:18'),(31,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 18:01:29'),(32,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 18:02:30'),(33,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 18:23:37'),(34,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 18:23:40'),(35,3,'doctor','FAILED_LOGIN','Incorrect password entered','2026-02-11 18:26:51'),(36,2,'patient','FAILED_LOGIN','Incorrect password entered','2026-02-14 16:30:27');
/*!40000 ALTER TABLE `audit_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `target_id` int DEFAULT NULL,
  `sensitivity` varchar(20) DEFAULT 'NORMAL',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-24 16:59:18',2,'NORMAL'),(2,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:29:19',3,'NORMAL'),(3,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:29:34',2,'NORMAL'),(4,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:29:55',3,'NORMAL'),(5,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:33:57',4,'NORMAL'),(6,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:34:06',2,'NORMAL'),(7,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:34:47',3,'NORMAL'),(8,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:45:20',2,'NORMAL'),(9,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:45:47',3,'NORMAL'),(10,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-02-24 17:55:04',1,'NORMAL'),(11,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-25 16:02:59',2,'NORMAL'),(12,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-25 16:06:13',3,'NORMAL'),(13,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-02-25 16:08:01',4,'NORMAL'),(14,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-02-25 16:08:28',1,'NORMAL'),(15,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-26 06:27:56',2,'NORMAL'),(16,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-26 06:35:34',3,'NORMAL'),(17,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-02-26 06:40:59',4,'NORMAL'),(18,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-02-26 06:41:32',1,'NORMAL'),(19,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-26 06:56:38',2,'NORMAL'),(20,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-26 07:14:16',2,'NORMAL'),(21,6,'patient','REGISTER_SUCCESS','User registered successfully','2026-02-28 11:54:14',6,'NORMAL'),(22,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 11:56:41',2,'NORMAL'),(23,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-28 12:02:23',3,'NORMAL'),(24,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 12:05:17',2,'NORMAL'),(25,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-28 12:07:07',3,'NORMAL'),(26,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 12:31:23',2,'NORMAL'),(27,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-28 12:33:43',3,'NORMAL'),(28,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 12:35:17',2,'NORMAL'),(29,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 13:02:15',2,'NORMAL'),(30,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 13:24:05',2,'NORMAL'),(31,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-28 16:12:57',3,'NORMAL'),(32,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-02-28 16:20:06',4,'NORMAL'),(33,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-02-28 16:20:25',1,'NORMAL'),(34,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-02-28 16:21:08',3,'NORMAL'),(35,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-02-28 16:37:24',2,'NORMAL'),(36,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-02 03:44:56',2,'NORMAL'),(37,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-02 04:14:16',3,'NORMAL'),(38,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-03-02 04:18:31',4,'NORMAL'),(39,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-03-02 04:19:34',1,'NORMAL'),(40,7,'patient','REGISTER_SUCCESS','User registered successfully','2026-03-03 04:18:26',7,'NORMAL'),(41,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-03 04:27:48',2,'NORMAL'),(42,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-03 05:03:54',3,'NORMAL'),(43,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-03-03 05:16:06',4,'NORMAL'),(44,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-03-03 05:21:16',1,'NORMAL'),(45,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-03 05:25:05',2,'NORMAL'),(46,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-03 06:01:48',3,'NORMAL'),(47,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-03-03 06:32:28',4,'NORMAL'),(48,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-14 15:05:34',2,'NORMAL'),(49,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-14 15:09:02',3,'NORMAL'),(50,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-03-14 15:11:26',4,'NORMAL'),(51,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-03-14 15:11:57',1,'NORMAL'),(52,8,'patient','REGISTER_SUCCESS','User registered successfully','2026-03-14 15:53:30',8,'NORMAL'),(53,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-14 15:53:57',2,'NORMAL'),(54,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-14 16:01:01',3,'NORMAL'),(55,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-03-14 16:03:49',4,'NORMAL'),(56,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-03-14 16:04:35',1,'NORMAL'),(57,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-22 11:02:39',2,'NORMAL'),(58,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-22 11:07:40',3,'NORMAL'),(59,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-03-22 11:08:23',1,'NORMAL'),(60,2,'patient','LOGIN_SUCCESS','User logged in successfully','2026-03-23 12:56:47',2,'NORMAL'),(61,3,'doctor','LOGIN_SUCCESS','User logged in successfully','2026-03-23 13:03:00',3,'NORMAL'),(62,4,'expert','LOGIN_SUCCESS','User logged in successfully','2026-03-23 13:05:07',4,'NORMAL'),(63,1,'admin','LOGIN_SUCCESS','User logged in successfully','2026-03-23 13:05:31',1,'NORMAL');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_diagnosis`
--

DROP TABLE IF EXISTS `doctor_diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_diagnosis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `record_id` int NOT NULL,
  `diagnosis_title` varchar(255) NOT NULL,
  `diagnosis_details` text NOT NULL,
  `severity` enum('mild','moderate','severe') NOT NULL,
  `proof_file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `record_id` (`record_id`),
  CONSTRAINT `doctor_diagnosis_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`),
  CONSTRAINT `doctor_diagnosis_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `doctor_diagnosis_ibfk_3` FOREIGN KEY (`record_id`) REFERENCES `medical_records` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_diagnosis`
--

LOCK TABLES `doctor_diagnosis` WRITE;
/*!40000 ALTER TABLE `doctor_diagnosis` DISABLE KEYS */;
INSERT INTO `doctor_diagnosis` VALUES (1,2,3,1,'Type 2 Diabetes','Elevated blood sugar, lifestyle changes advised','moderate','uploads\\1768927393260-Medical-Reports.png','2026-01-20 16:43:13');
/*!40000 ALTER TABLE `doctor_diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_permissions`
--

DROP TABLE IF EXISTS `doctor_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `granted_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `doctor_permissions_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `doctor_permissions_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_permissions`
--

LOCK TABLES `doctor_permissions` WRITE;
/*!40000 ALTER TABLE `doctor_permissions` DISABLE KEYS */;
INSERT INTO `doctor_permissions` VALUES (1,3,2,'approved','2026-02-24 17:29:38',NULL,'2026-02-24 17:29:28');
/*!40000 ALTER TABLE `doctor_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_record_modifications`
--

DROP TABLE IF EXISTS `doctor_record_modifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_record_modifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `record_id` int DEFAULT NULL,
  `requested_by` int DEFAULT NULL,
  `new_title` varchar(255) DEFAULT NULL,
  `new_description` text,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_record_modifications`
--

LOCK TABLES `doctor_record_modifications` WRITE;
/*!40000 ALTER TABLE `doctor_record_modifications` DISABLE KEYS */;
INSERT INTO `doctor_record_modifications` VALUES (1,1,3,'Updated Fever Treatment','Updated description by current doctor','approved','2026-02-24 05:09:43'),(2,2,3,'Patient 2 MRI Sacn','MRI of right knee shows partial tear of anterior cruciate ligament (ACL). Mild joint effusion present. Menisci appear intact. No bony contusion detected. Recommend orthopedic follow-up.”','pending','2026-02-24 05:50:12'),(3,2,3,'Patient 2 MRI Sacn','MRI of right knee shows partial tear of anterior cruciate ligament (ACL). Mild joint effusion present. Menisci appear intact. No bony contusion detected. Recommend orthopedic follow-up.”','pending','2026-02-24 06:11:28'),(4,2,3,'Patient 2 MRI Sacn','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL). ','pending','2026-02-24 06:29:51');
/*!40000 ALTER TABLE `doctor_record_modifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_records`
--

DROP TABLE IF EXISTS `doctor_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `record_type` enum('prescription','scan','diagnosis') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_records`
--

LOCK TABLES `doctor_records` WRITE;
/*!40000 ALTER TABLE `doctor_records` DISABLE KEYS */;
INSERT INTO `doctor_records` VALUES (1,2,3,'prescription','MRI scan of Patient1','Patient admitted with complaints of epigastric pain and vomiting. Diagnosed with acute gastritis. Treated with IV fluids and proton pump inhibitors. Symptoms improved. Discharged in stable condition with medications and dietary advice.”','1771909575367-scan report.jpg','2026-02-24 05:06:15'),(2,2,3,'scan','Patient 2 MRI Scan','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL).','1771911322330-MRI scan img1.jpg','2026-02-24 05:35:22'),(3,2,3,'prescription','Viral Fever Patient ID1','Fever is on normal stage','1771924921818-new medical report.webp','2026-02-24 09:22:01'),(4,2,3,'scan','Updated KMCH Xray report','MRI scan report of patient ID 2','1771954330136-xray img1.jpg','2026-02-24 17:32:10'),(5,2,3,'prescription','Diabetes prescription ','Patient presents with polyuria and fatigue. Fasting blood sugar: 168 mg/dL. HbA1c: 8.2%. Diagnosed with Type 2 Diabetes Mellitus. Started on Metformin 500 mg twice daily. Lifestyle modification advised','1772281875837-diabetes report 1.jpeg','2026-02-28 12:31:15'),(6,2,3,'scan','CT Scan of Patient 1','HRCT chest shows patchy ground-glass opacities in bilateral lower lobes. No pleural effusion. Findings suggest mild viral pneumonitis. Clinical correlation recommended','1772282110820-MRI scan img1.jpg','2026-02-28 12:35:10'),(7,2,3,'scan','ECG Scan of Patient2','Resting ECG shows normal sinus rhythm with heart rate of 78 bpm. No ST-segment elevation or depression observed. No arrhythmias detected.','1772295539245-ECG Image1.jpg','2026-02-28 16:18:59'),(8,2,3,'scan','Dhamodharan MRI scan ','MRI brain performed with contrast. No evidence of acute infarct or intracranial hemorrhage. Ventricular system appears normal. No mass lesion identified. Mild sinus mucosal thickening noted. Findings suggest no significant intracranial abnormality','1772424980656-MRI 3.jpg','2026-03-02 04:16:20'),(9,2,3,'scan','Not Clear Report image','Need to change this file or remove from the uploaded list','1772518753902-discharge Img1.jpg','2026-03-03 06:19:13'),(10,2,3,'scan','New Updated Patient Dhamodharan Record','Full discharge Summary','1772518829886-discharge Img1.jpg','2026-03-03 06:20:29');
/*!40000 ALTER TABLE `doctor_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergency_profiles`
--

DROP TABLE IF EXISTS `emergency_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergency_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `allergies` text,
  `chronic_conditions` text,
  `emergency_contact` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergency_profiles`
--

LOCK TABLES `emergency_profiles` WRITE;
/*!40000 ALTER TABLE `emergency_profiles` DISABLE KEYS */;
INSERT INTO `emergency_profiles` VALUES (1,2,'O+','None','Asthma','9876543210','2026-02-24 16:59:23');
/*!40000 ALTER TABLE `emergency_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_policies`
--

DROP TABLE IF EXISTS `insurance_policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance_policies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `provider_name` varchar(255) NOT NULL,
  `policy_number` varchar(100) NOT NULL,
  `policy_type` varchar(100) DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_to` date DEFAULT NULL,
  `document_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `insurance_policies_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_policies`
--

LOCK TABLES `insurance_policies` WRITE;
/*!40000 ALTER TABLE `insurance_policies` DISABLE KEYS */;
/*!40000 ALTER TABLE `insurance_policies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_policy_rules`
--

DROP TABLE IF EXISTS `insurance_policy_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance_policy_rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider_name` varchar(255) NOT NULL,
  `policy_type` varchar(100) DEFAULT NULL,
  `covered_conditions` text,
  `excluded_conditions` text,
  `max_claim_amount` int DEFAULT NULL,
  `waiting_period` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_policy_rules`
--

LOCK TABLES `insurance_policy_rules` WRITE;
/*!40000 ALTER TABLE `insurance_policy_rules` DISABLE KEYS */;
INSERT INTO `insurance_policy_rules` VALUES (1,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-09 07:57:10'),(2,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-09 07:57:10'),(3,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-09 07:57:10'),(4,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-09 07:57:10'),(5,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-09 10:08:43'),(6,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-09 10:08:43'),(7,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-09 10:08:43'),(8,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-09 10:08:43'),(9,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 04:04:34'),(10,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 04:04:34'),(11,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 04:04:34'),(12,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 04:04:34'),(13,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 04:19:22'),(14,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 04:19:22'),(15,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 04:19:22'),(16,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 04:19:22'),(17,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 04:19:42'),(18,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 04:19:42'),(19,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 04:19:42'),(20,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 04:19:42'),(21,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 04:48:46'),(22,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 04:48:46'),(23,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 04:48:46'),(24,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 04:48:46'),(25,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 04:55:47'),(26,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 04:55:47'),(27,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 04:55:47'),(28,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 04:55:47'),(29,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 05:17:40'),(30,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 05:17:40'),(31,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 05:17:40'),(32,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 05:17:40'),(33,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-11 17:25:51'),(34,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-11 17:25:51'),(35,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-11 17:25:51'),(36,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-11 17:25:51'),(37,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-12 16:05:23'),(38,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-12 16:05:23'),(39,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-12 16:05:23'),(40,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-12 16:05:23'),(41,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-12 16:06:42'),(42,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-12 16:06:42'),(43,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-12 16:06:42'),(44,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-12 16:06:42'),(45,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-12 16:06:55'),(46,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-12 16:06:55'),(47,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-12 16:06:55'),(48,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-12 16:06:55'),(49,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-12 16:13:50'),(50,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-12 16:13:50'),(51,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-12 16:13:50'),(52,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-12 16:13:50'),(53,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-12 16:16:21'),(54,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-12 16:16:21'),(55,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-12 16:16:21'),(56,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-12 16:16:21'),(57,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 04:44:50'),(58,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 04:44:50'),(59,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 04:44:50'),(60,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 04:44:50'),(61,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 08:55:43'),(62,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 08:55:43'),(63,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 08:55:43'),(64,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 08:55:43'),(65,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 09:04:22'),(66,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 09:04:22'),(67,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 09:04:22'),(68,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 09:04:22'),(69,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 09:42:24'),(70,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 09:42:24'),(71,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 09:42:24'),(72,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 09:42:24'),(73,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 09:42:41'),(74,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 09:42:41'),(75,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 09:42:41'),(76,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 09:42:41'),(77,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 14:38:28'),(78,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 14:38:28'),(79,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 14:38:28'),(80,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 14:38:28'),(81,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 14:51:48'),(82,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 14:51:48'),(83,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 14:51:48'),(84,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 14:51:48'),(85,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 14:52:39'),(86,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 14:52:39'),(87,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 14:52:39'),(88,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 14:52:39'),(89,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-15 15:20:17'),(90,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-15 15:20:17'),(91,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-15 15:20:17'),(92,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-15 15:20:17'),(93,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-17 04:27:01'),(94,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-17 04:27:01'),(95,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-17 04:27:01'),(96,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-17 04:27:01'),(97,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-17 04:29:34'),(98,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-17 04:29:34'),(99,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-17 04:29:34'),(100,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-17 04:29:34'),(101,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-17 04:31:14'),(102,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-17 04:31:14'),(103,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-17 04:31:14'),(104,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-17 04:31:14'),(105,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-23 15:03:41'),(106,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-23 15:03:41'),(107,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-23 15:03:41'),(108,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-23 15:03:41'),(109,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-23 15:17:34'),(110,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-23 15:17:34'),(111,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-23 15:17:34'),(112,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-23 15:17:34'),(113,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-23 15:25:25'),(114,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-23 15:25:25'),(115,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-23 15:25:25'),(116,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-23 15:25:25'),(117,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-23 15:38:41'),(118,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-23 15:38:41'),(119,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-23 15:38:41'),(120,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-23 15:38:41'),(121,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-23 15:49:57'),(122,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-23 15:49:57'),(123,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-23 15:49:57'),(124,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-23 15:49:57'),(125,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-24 04:37:52'),(126,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-24 04:37:52'),(127,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-24 04:37:52'),(128,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-24 04:37:52'),(129,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-24 16:38:42'),(130,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-24 16:38:42'),(131,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-24 16:38:42'),(132,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-24 16:38:42'),(133,'Star Health','Diabetes Safe Policy','diabetes,hypertension','cancer',500000,12,'2026-02-24 16:40:17'),(134,'HDFC Ergo','Optima Restore','cancer,heart disease','diabetes',1000000,24,'2026-02-24 16:40:17'),(135,'ICICI Lombard','Complete Health','diabetes,heart disease,asthma','',750000,18,'2026-02-24 16:40:17'),(136,'New India Assurance','Mediclaim','fever,infection','diabetes,cancer',300000,6,'2026-02-24 16:40:17');
/*!40000 ALTER TABLE `insurance_policy_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_rules`
--

DROP TABLE IF EXISTS `insurance_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance_rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `condition_keyword` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `policy_name` varchar(100) DEFAULT NULL,
  `recommendation_type` enum('recommended','not_recommended') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_rules`
--

LOCK TABLES `insurance_rules` WRITE;
/*!40000 ALTER TABLE `insurance_rules` DISABLE KEYS */;
INSERT INTO `insurance_rules` VALUES (1,'diabetes','Star Health','Diabetes Safe Policy','recommended'),(2,'diabetes','Care Health','Care Freedom Plan','recommended'),(3,'diabetes','ABC Insurance','Basic Health Plan','not_recommended'),(4,'heart','ICICI Lombard','Heart Protect Plus','recommended'),(5,'heart','XYZ Insurance','Standard Health Plan','not_recommended'),(6,'cancer','HDFC Ergo','Critical Cancer Cover','recommended'),(7,'cancer','ABC Insurance','Basic Health Plan','not_recommended'),(8,'kidney','Star Health','Renal Secure Plan','recommended'),(9,'kidney','XYZ Insurance','Standard Health Plan','not_recommended'),(10,'liver','Care Health','Liver Protect Plan','recommended'),(11,'stroke','ICICI Lombard','Stroke Shield','recommended'),(12,'asthma','Bajaj Allianz','Respiratory Care Plan','recommended'),(13,'hypertension','Max Bupa','BP Secure Plan','recommended'),(14,'covid','Religare','COVID Shield Plan','recommended'),(15,'arthritis','Apollo Munich','Joint Care Plan','recommended');
/*!40000 ALTER TABLE `insurance_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT 'General',
  `description` text,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `uploaded_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
INSERT INTO `medical_records` VALUES (1,2,'new one','General','Routine blood test','uploads\\1768925982486-Screenshot 2025-07-28 213252.png','2026-01-20 16:19:42','pending',NULL),(2,2,'new updated Report','General',NULL,'1769063628205-987610453.png','2026-01-22 06:33:48','pending',NULL),(3,2,'Dhamu\'s Blood Report','General',NULL,'1769063668231-149548845.png','2026-01-22 06:34:28','pending',NULL),(4,2,'insurance report','General',NULL,'1769186392155-203141921.webp','2026-01-23 16:39:52','pending',NULL),(5,2,'Blood Test','General',NULL,'1770006730845-Medical-Reports.png','2026-02-02 04:32:10','pending',NULL),(6,2,'report','General',NULL,'1770009173547-insurance_report.webp','2026-02-02 05:12:53','pending',NULL),(7,2,'Blood Test','General',NULL,'1770038536684-Medical-Reports.png','2026-02-02 13:22:16','pending',NULL),(8,2,'Sri haris sample record','General',NULL,'1770038558667-Medical-Reports.png','2026-02-02 13:22:38','pending',NULL),(9,2,'Medical History','General',NULL,'1770039042356-Medical-Reports.png','2026-02-02 13:30:42','pending',NULL),(10,2,'Blood Test','General',NULL,'1770040376250-Medical-Reports.png','2026-02-02 13:52:56','pending',NULL),(11,2,'Medical record of dsj','General',NULL,'1770211557453-insurance_report.webp','2026-02-04 13:25:57','pending',NULL),(12,2,'insurance report','General',NULL,'1770212311998-insurance_report.webp','2026-02-04 13:38:32','pending',NULL),(13,2,'insurance','General',NULL,'1770539974012-Medical-Reports.png','2026-02-08 08:39:34','pending',NULL),(14,2,'medical 1','General',NULL,'1770541717572-Medical-Reports.png','2026-02-08 09:08:37','pending',NULL),(15,1,'medi','General',NULL,'1770548122750-Medical-Reports.png','2026-02-08 10:55:22','pending',NULL),(16,1,'medicalreport','General',NULL,'1770814920530-Medical-Reports.png','2026-02-11 13:02:00','pending',NULL),(18,2,'insurance1','General',NULL,'1770911741637-insurance_report.webp','2026-02-12 15:55:41','pending',2),(19,2,'medi2','General',NULL,'1771082078417-Medical-Reports.png','2026-02-14 15:14:38','pending',2),(20,2,'Insurance record','General',NULL,'1771085021083-insurance_report.webp','2026-02-14 16:03:41','pending',2),(21,2,'medi21','General',NULL,'1771135114233-Medical-Reports.png','2026-02-15 05:58:34','pending',2),(22,2,'Medical2001','General',NULL,'1771137391975-Medical-Reports.png','2026-02-15 06:36:31','pending',2),(23,2,'medi kmch','General',NULL,'1771165374019-Medical-Reports.png','2026-02-15 14:22:54','pending',2),(25,2,'Sai medicals','General',NULL,'1771254883855-Medical image2.jpeg','2026-02-16 15:14:43','pending',2),(26,2,'Medi upadte','General',NULL,'1771501230543-Medical image2.jpeg','2026-02-19 11:40:30','pending',2),(27,3,'medi33','General',NULL,'1771577887425-Medical image2.jpeg','2026-02-20 08:58:07','pending',3),(28,2,'CMC Medical report','General',NULL,'1771580732664-new medical report.webp','2026-02-20 09:45:32','pending',2),(29,2,'Medical Document of KMCH','General',NULL,'1771672904656-Medical doc1.png','2026-02-21 11:21:44','pending',2),(30,2,'21Medical','General',NULL,'1771775423429-doctor-medical-bg2.jpg','2026-02-22 15:50:23','pending',2),(32,2,'Description','General',NULL,'1771827470325-new medical report.webp','2026-02-23 06:17:50','pending',2),(33,2,'scan report','General',NULL,'1771850631788-scan report.jpg','2026-02-23 12:43:51','pending',2),(34,2,'Scan report of mom','Scan Report',NULL,'1771852184872-scan report 2.webp','2026-02-23 13:09:44','pending',2),(35,2,'Prescription KMCH','Prescription',NULL,'1771860435290-new medical report.webp','2026-02-23 15:27:15','pending',2),(36,2,'Sample report','Other',NULL,'1771866160775-sample_fhir_patient.json','2026-02-23 17:02:40','pending',2),(38,2,'My xray img','Scan Report',NULL,'1771946322912-MRI scan img2.jpg','2026-02-24 15:18:42','pending',2),(39,2,'Brain Scan','Scan Report',NULL,'1771954105658-MRI scan img2.jpg','2026-02-24 17:28:25','pending',2),(40,2,'Royal Care scan','Scan Report',NULL,'1772035416049-MRI scan img2.jpg','2026-02-25 16:03:36','pending',2),(41,2,'sample scan','Scan Report',NULL,'1772087326806-MRI scan img1.jpg','2026-02-26 06:28:46','pending',2),(43,2,'Brain CT scan','Scan Report','','1772295093945-CT scan2.jpg','2026-02-28 16:11:33','approved',2),(46,2,'My X-ray Report','Scan Report','','1772515557916-xray img3.webp','2026-03-03 05:25:57','approved',2),(49,2,'scan','Scan Report','','1774177389336-CT scan2.jpg','2026-03-22 11:03:09','approved',2),(50,2,'sample scan','Scan Report','','1774270648463-CT scan2.jpg','2026-03-23 12:57:28','approved',2);
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `message` text,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,2,'Doctor uploaded a new medical record',0,'2026-02-24 05:06:15'),(2,2,'Expert approved modification in your record',0,'2026-02-24 05:12:36'),(3,2,'Doctor uploaded a new medical record',0,'2026-02-24 05:35:22'),(4,2,'MOD_UPLOAD',0,'2026-02-24 09:22:01'),(5,2,'MOD_REQUESTED',0,'2026-02-24 09:23:55'),(6,2,'MOD_REQUESTED',0,'2026-02-24 09:57:19'),(7,2,'MOD_REQUESTED',0,'2026-02-24 09:58:28'),(8,2,'MOD_REQUESTED',0,'2026-02-24 15:24:02'),(9,2,'MOD_REQUESTED',0,'2026-02-24 15:42:22'),(10,2,'MOD_REQUESTED',0,'2026-02-24 15:43:35'),(11,2,'MOD_APPROVED',0,'2026-02-24 16:11:06'),(12,2,'MOD_APPROVED',0,'2026-02-24 16:11:14'),(13,2,'MOD_REJECTED',0,'2026-02-24 16:11:18'),(14,2,'MOD_REJECTED',0,'2026-02-24 16:11:24'),(15,2,'MOD_REJECTED',0,'2026-02-24 16:11:27'),(16,2,'MOD_REJECTED',0,'2026-02-24 16:11:31'),(17,2,'MOD_APPROVED',0,'2026-02-24 16:11:39'),(18,2,'MOD_UPLOAD',0,'2026-02-24 17:32:10'),(19,2,'MOD_REQUESTED',0,'2026-02-24 17:33:34'),(20,2,'MOD_APPROVED',0,'2026-02-24 17:34:00'),(21,2,'MOD_REQUESTED',0,'2026-02-25 16:07:48'),(22,2,'MOD_APPROVED',0,'2026-02-25 16:08:15'),(23,2,'MOD_REQUESTED',0,'2026-02-26 06:40:40'),(24,2,'MOD_APPROVED',0,'2026-02-26 06:41:14'),(25,2,'MOD_UPLOAD',0,'2026-02-28 12:31:15'),(26,2,'MOD_UPLOAD',0,'2026-02-28 12:35:10'),(27,2,'MOD_UPLOAD',0,'2026-02-28 16:18:59'),(28,2,'MOD_REQUESTED',0,'2026-02-28 16:19:49'),(29,2,'MOD_APPROVED',0,'2026-02-28 16:20:11'),(30,2,'MOD_UPLOAD',0,'2026-03-02 04:16:20'),(31,2,'MOD_REQUESTED',0,'2026-03-02 04:18:16'),(32,2,'MOD_REJECTED',0,'2026-03-03 05:16:15'),(33,2,'MOD_UPLOAD',0,'2026-03-03 06:19:13'),(34,2,'MOD_UPLOAD',0,'2026-03-03 06:20:29'),(35,2,'MOD_REQUESTED',0,'2026-03-03 06:21:18'),(36,2,'MOD_APPROVED',0,'2026-03-03 06:32:30'),(37,2,'MOD_REQUESTED',0,'2026-03-14 15:11:11'),(38,2,'MOD_APPROVED',0,'2026-03-14 15:11:44'),(39,2,'MOD_REQUESTED',0,'2026-03-14 16:03:23'),(40,2,'MOD_REJECTED',0,'2026-03-14 16:04:09'),(41,2,'MOD_REQUESTED',0,'2026-03-23 13:04:47'),(42,2,'MOD_APPROVED',0,'2026-03-23 13:05:15');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_change_requests`
--

DROP TABLE IF EXISTS `record_change_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record_change_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `record_id` int DEFAULT NULL,
  `requested_by` int DEFAULT NULL,
  `new_title` varchar(255) DEFAULT NULL,
  `new_file_path` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `reviewed_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_change_requests`
--

LOCK TABLES `record_change_requests` WRITE;
/*!40000 ALTER TABLE `record_change_requests` DISABLE KEYS */;
INSERT INTO `record_change_requests` VALUES (1,2,3,'new updated Report',NULL,'approved',4,'2026-02-12 11:54:45'),(2,1,3,'new one',NULL,'approved',4,'2026-02-12 16:59:50'),(3,11,3,'Medical record of dsj',NULL,'approved',4,'2026-02-14 15:50:52'),(4,3,3,'Dhamu\'s Blood Report',NULL,'approved',4,'2026-02-15 14:26:40'),(5,4,3,'insurance report',NULL,'approved',4,'2026-02-19 11:44:37'),(6,9,3,'Medical History',NULL,'approved',4,'2026-02-20 07:28:22'),(7,28,3,'CMC Medical report',NULL,'approved',4,'2026-02-20 09:47:46'),(8,29,3,'Medical Document of KMCH',NULL,'approved',4,'2026-02-21 11:24:05'),(9,22,3,'Medical2001',NULL,'approved',4,'2026-02-22 15:52:05'),(10,32,3,'Description',NULL,'approved',4,'2026-02-23 15:01:03'),(11,8,3,'Sri haris sample record',NULL,'approved',4,'2026-02-23 15:54:01'),(12,36,3,'Error Report',NULL,'pending',NULL,'2026-02-24 05:52:02');
/*!40000 ALTER TABLE `record_change_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_modifications`
--

DROP TABLE IF EXISTS `record_modifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record_modifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `record_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `new_title` varchar(255) DEFAULT NULL,
  `new_description` text,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_modifications`
--

LOCK TABLES `record_modifications` WRITE;
/*!40000 ALTER TABLE `record_modifications` DISABLE KEYS */;
INSERT INTO `record_modifications` VALUES (1,2,2,3,'Patient 2 MRI Sacn','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL). ','approved','2026-02-24 07:34:39'),(2,1,2,3,'MRI scan of Patient1','Patient admitted with complaints of epigastric pain and vomiting. Diagnosed with acute gastritis. Treated with IV fluids and proton pump inhibitors. Symptoms improved. Discharged in stable condition with medications and dietary advice.”','rejected','2026-02-24 09:23:55'),(3,1,2,3,'MRI scan of Patient1','Patient admitted with complaints of epigastric pain and vomiting. Diagnosed with acute gastritis. Treated with IV fluids and proton pump inhibitors. Symptoms improved. Discharged in stable condition with medications and dietary advice.”','rejected','2026-02-24 09:57:19'),(4,3,2,3,'Patient 2 MRI Sacn','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL). ','rejected','2026-02-24 09:58:28'),(5,2,2,3,'Patient 2 MRI Scan report','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL). ','rejected','2026-02-24 15:24:02'),(6,1,2,3,'MRI scan of Patient1','Patient admitted with complaints of epigastric pain and vomiting. Diagnosed with acute gastritis. Treated with IV fluids and proton pump inhibitors. Symptoms improved. Discharged in stable condition with medications and dietary advice.”','approved','2026-02-24 15:42:22'),(7,2,2,3,'Patient 2 MRI Scan report','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL). ','approved','2026-02-24 15:43:35'),(8,4,2,3,'Updated KMCH Xray report','MRI scan report of patient ID 2','approved','2026-02-24 17:33:34'),(9,2,2,3,'Patient 2 MRI Scan','“MRI of right knee shows partial tear of anterior cruciate ligament (ACL).','approved','2026-02-25 16:07:47'),(10,3,2,3,'Viral Fever Patient ID1','Fever is on normal stage','approved','2026-02-26 06:40:40'),(11,6,2,3,'CT Scan of Patient 1','HRCT chest shows patchy ground-glass opacities in bilateral lower lobes. No pleural effusion. Findings suggest mild viral pneumonitis. Clinical correlation recommended','approved','2026-02-28 16:19:49'),(12,4,2,3,'Neck X-Ray','X_ray image of Patient ID 2','rejected','2026-03-02 04:18:16'),(13,9,2,3,'Miss aligned report','Need to change this file','approved','2026-03-03 06:21:18'),(14,9,2,3,'Not Clear Report image','Need to change this file or remove from the uploaded list','approved','2026-03-14 15:11:11'),(15,8,2,3,'Dhamodharan brain scan image','Need more descriptions ','rejected','2026-03-14 16:03:23'),(16,8,2,3,'Dhamodharan MRI scan ','MRI brain performed with contrast. No evidence of acute infarct or intracranial hemorrhage. Ventricular system appears normal. No mass lesion identified. Mild sinus mucosal thickening noted. Findings suggest no significant intracranial abnormality','approved','2026-03-23 13:04:47');
/*!40000 ALTER TABLE `record_modifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','doctor','patient','expert') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `specialization` varchar(100) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `experience` int DEFAULT '0',
  `is_expert` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'System Admin','admin@test.com','9999999999','$2b$10$Z7MEH6.X2MARXWLVIxGaCusiGbqwWI69Sd0xj1yYcuW0kUeTRMhqW','admin','2026-02-24 16:40:56',NULL,NULL,0,0),(2,'Test Patient','patient@test.com','8888888888','$2b$10$4/ys8oGj3UsK7DSXxFvfve0EJS0SbX2WG7I3zxpiDQfLAxCoqIIoW','patient','2026-02-24 16:40:56',NULL,NULL,0,0),(3,'Test Doctor','doctor@test.com','7777777777','$2b$10$R5dZwALoGA6wrfTX3QLmwOby7.6n1o40itpuFADGxJzCHNKlt0ULi','doctor','2026-02-24 16:40:56','Dermatologist','English',5,0),(4,'Expert Doctor','expert@test.com',NULL,'$2b$10$iIwmqCAyTJiNBbjq8hfSd.px3V0uPzwmv39dlZlcfGPkXpffoybgG','expert','2026-02-24 16:40:56',NULL,NULL,0,0),(6,'Dhamodharan S ','dhamodharans2001@gmail.com',NULL,'$2b$10$EJLQBV0Plj77sQ1otwtBCeHg4FJMh3fOkla3wDmE84Vrk3L0i21b6','patient','2026-02-28 11:54:14',NULL,NULL,0,0),(7,'Dhamodharan S ','dhamudsj21@gmail.com',NULL,'$2b$10$Tfdfs5RxKEyC6NphCU4x0uS.fdRmD/JSy1nORhpO2s4INY2P2NAVW','patient','2026-03-03 04:18:26',NULL,NULL,0,0),(8,'Mukesh D','dm457694@gmail.com',NULL,'$2b$10$KHknThk8h4IBG9wF7RTiUupHArABBIRe4LEkc9NVLOrNfu6ZxpqKa','patient','2026-03-14 15:53:30',NULL,NULL,0,0);
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

-- Dump completed on 2026-05-07 17:36:23
