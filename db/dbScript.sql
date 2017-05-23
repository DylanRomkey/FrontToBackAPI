-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dylansdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dylansdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dylansdb` DEFAULT CHARACTER SET latin1 ;
USE `dylansdb` ;

-- -----------------------------------------------------
-- Table `dylansdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dylansdb`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` CHAR(64) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `lastLogin` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
