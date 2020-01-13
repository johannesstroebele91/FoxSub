package main

import (
	_ "database/sql"

	_ "github.com/lib/pq"
	"gopkg.in/guregu/null.v3"
)

var UsersSchema = `
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    goal DECIMAL,
    monthlyCumulatedPayment DECIMAL NULL DEFAULT 0,
    nextDueDate DATETIME
);
`

type User struct {
	ID                      string     `db:"id" json:"uuid"`
	FirstName               string     `db:"firstName" json:"firstName"`
	LastName                string     `db:"lastName" json:"lastName"`
	Email                   string     `db:"email" json:"email"`
	Password                string     `db:"password" json:"password"`
	Goal                    null.Float `db:"goal" json:"goal"`
	MonthlyCumulatedPayment null.Float `db:"monthlyCumulatedPayment" json:"monthlyCumulatedPayment"`
	NextDueDate             null.Time  `db:"nextDueDate" json:"nextDueDate"`
}

var SubscriptionsSchema = `
CREATE TABLE IF NOT EXISTS subscriptions (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    cost DECIMAL NOT NULL,
    dueDate DATE NOT NULL,
    monthlyPayment BOOLEAN NOT NULL,
	automaticPayment BOOLEAN NOT NULL,
	paymentMethod VARCHAR(255),
	serviceId VARCHAR(36),
	userId VARCHAR(36),
	FOREIGN KEY (serviceId) REFERENCES services(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
`

type Subscription struct {
	ID               float32     `db:"id" json:"-"`
	UUID             string      `db:"uuid" json:"uuid"`
	Cost             float32     `db:"cost" json:"cost"`
	DueDate          string      `db:"dueDate" json:"dueDate"`
	PaymentMethod    null.String `db:"paymentMethod" json:"paymentMethod"`
	MonthlyPayment   bool        `db:"monthlyPayment" json:"monthlyPayment"`
	AutomaticPayment bool        `db:"automaticPayment" json:"automaticPayment"`
	UserID           string      `db:"userId" json:"-" json:"userId"`
	ServiceID        string      `db:"serviceId" json:"-" json:"serviceId"`
	Service          `db:"service" json:"service"`
}

var ServicesSchema = `
CREATE TABLE IF NOT EXISTS services (
	id VARCHAR(36) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	imageURL VARCHAR(255),
	category VARCHAR(255) NOT NULL,
    FOREIGN KEY (category) REFERENCES categories(name)
);
`

type Service struct {
	ID       string      `db:"id" json:"uuid"`
	Name     string      `db:"name" json:"name"`
	ImageURL null.String `db:"imageUrl" json:"imageUrl"`
	Category string      `db:"category" json:"category"`
}

var SessionsSchema = `
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(36) PRIMARY KEY,
	userId VARCHAR(36) NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(id)
);`

type Session struct {
	ID     string `db:"id" json:"uuid"`
	UserID string `db:"userId" json:"userId"`
}

var CategoriesSchema = `
CREATE TABLE IF NOT EXISTS categories (
	id VARCHAR(36) PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);
`

type Credentials struct {
	Email    string `json:"email" json:"email"`
	Password string `json:"password" json:"password"`
}
