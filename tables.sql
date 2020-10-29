create database department_db;
USE department_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL NULL,
department_id INT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee (
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL, 
role_id INT NULL,
manager_id INT NULL,

PRIMARY KEY(id)
);