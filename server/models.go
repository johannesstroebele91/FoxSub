package main

import (
	_ "database/sql"
	"time"

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
	ID                      string     `db:"id"`
	FirstName               string     `db:"firstName"`
	LastName                string     `db:"lastName"`
	Email                   string     `db:"email"`
	Password                string     `db:"password"`
	Goal                    null.Float `db:"goal"`
	MonthlyCumulatedPayment null.Float `db:"monthlyCumulatedPayment,omitempty"`
	NextDueDate             null.Time  `db:"nextDueDate,omitempty"`
}

var SubscriptionsSchema = `
CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    cost DECIMAL NOT NULL,
    dueDate DATE NOT NULL,
    monthlyPayment BOOLEAN NOT NULL,
	automaticPayment BOOLEAN NOT NULL,
	serviceId VARCHAR(36),
	userId VARCHAR(36),
	FOREIGN KEY (serviceId) REFERENCES services(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
`

type Subscription struct {
	ID               string    `db:"id"`
	Cost             float32   `db:"cost"`
	DueDate          time.Time `db:"dueDate"`
	PaymentMethod    string    `db:"paymentMethod"`
	MonthlyPayment   bool      `db:"monthlyPayment"`
	AutomaticPayment bool      `db:"automaticPayment"`
	UserID           string    `db:"userId"`
	ServiceID        uint16    `db:"serviceID"`
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
	ID       string      `db:"id"`
	Name     string      `db:"name"`
	ImageURL null.String `db:"imageUrl"`
	Category string      `db:"category"`
}

var SessionsSchema = `
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(36) PRIMARY KEY,
	userId VARCHAR(36) NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(id)
);`

type Session struct {
	ID     string `db:"id"`
	UserID string `db:"userId"`
}

var CategoriesSchema = `
CREATE TABLE IF NOT EXISTS categories (
	id VARCHAR(36) PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);
`

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
