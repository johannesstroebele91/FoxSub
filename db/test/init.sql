DROP DATABASE `fabulous-fox-test`;

CREATE DATABASE
IF NOT EXISTS `fabulous-fox-test`;

USE `fabulous-fox-test`;

CREATE TABLE
IF NOT EXISTS users
(
    id VARCHAR
(36) PRIMARY KEY,
    firstName VARCHAR
(255) NOT NULL,
    lastName VARCHAR
(255) NOT NULL,
    email VARCHAR
(255) UNIQUE NOT NULL,
    password VARCHAR
(255) NOT NULL,
    goal DECIMAL
);

CREATE TABLE
IF NOT EXISTS categories
(
	id VARCHAR
(36) PRIMARY KEY,
	name VARCHAR
(255) UNIQUE NOT NULL
);

CREATE TABLE
IF NOT EXISTS services
(
	id VARCHAR
(36) PRIMARY KEY,
	name VARCHAR
(255) NOT NULL,
	imageURL VARCHAR
(255),
	category VARCHAR
(255) NOT NULL,
    FOREIGN KEY
(category) REFERENCES categories
(name)
);

CREATE TABLE
IF NOT EXISTS subscriptions
(
	id INT
(11) PRIMARY KEY AUTO_INCREMENT,
	uuid VARCHAR
(36) UNIQUE NOT NULL,
  cost DECIMAL NOT NULL,
	month INT NOT NULL,
	day INT NOT NULL,
	monthlyPayment BOOLEAN NOT NULL,
	paymentMethod VARBINARY
(255),
	automaticPayment BOOLEAN NOT NULL,
	serviceId VARCHAR
(36),
	userId VARCHAR
(36),
	  FOREIGN KEY
(serviceId) REFERENCES services
(id),
		FOREIGN KEY
(userId) REFERENCES users
(id),
		CONSTRAINT month_constraint CHECK
(month >= 1 AND month <= 12),
		CONSTRAINT day_constraint CHECK
(day >= 1 and day <= 31)
);



CREATE TABLE
IF NOT EXISTS sessions
(
    id VARCHAR
(36) PRIMARY KEY,
	userId VARCHAR
(36) NOT NULL,
	FOREIGN KEY
(userId) REFERENCES users
(id)
);


INSERT INTO categories
VALUES
  (UUID(), 'Entertainment'),
  (UUID(), 'Productivity'),
  (UUID(), 'Games'),
  (UUID(), 'Others');

INSERT INTO users
VALUES 
('129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7a', 'Axel', 'Fotz', 'axel.fotz@internetlegende.de', 'admin123', 0);


INSERT INTO services
VALUES
  ('129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7b', 'Netflix', '', 'Entertainment');

INSERT INTO subscriptions
  (uuid, cost, month, day, monthlyPayment, paymentMethod, automaticPayment, serviceId, userId)
VALUES 
  ('129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7c', 2,1, 1,1,'Paypal',1,'129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7b','129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7a');

INSERT INTO sessions
VALUES
  ('129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7d', '129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7a');