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
PRIMARY KEY(role_id)
);

CREATE TABLE employee (
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL, 
role_id INT NULL,
manager_id INT NULL,

PRIMARY KEY(id)
KEY `employee_ibfk_1` (role_id)
);

-- I need to find out a foreign key issue, where it allows me to add a department, but I cant put a new employee inside the new department. I think it has something to do with a foreign key not reading the correct table it is supposed to.