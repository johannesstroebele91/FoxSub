package main

import (
	_ "database/sql"
	"encoding/json"

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
    goal DECIMAL
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
	DueDate                 `db:"dueDate" json:"dueDate"`
	Day                     int `db:"day" json:"-"`
	Month                   int `db:"month" json:"-"`
}

func (u *User) MarshalJSON() ([]byte, error) {
	type Alias User
	return json.Marshal(&struct {
		Password string `json:"password,omitempty"`
		*Alias
	}{
		Alias:    (*Alias)(u),
		Password: "",
	})
}

var SubscriptionsSchema = `
CREATE TABLE IF NOT EXISTS subscriptions (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	uuid VARCHAR(36) UNIQUE NOT NULL,
  cost DECIMAL NOT NULL,
	month INT NOT NULL,
	day INT NOT NULL,
	monthlyPayment BOOLEAN NOT NULL,
	paymentMethod VARBINARY(255),
	automaticPayment BOOLEAN NOT NULL,
	serviceId VARCHAR(36),
	userId VARCHAR(36),
	  FOREIGN KEY (serviceId) REFERENCES services(id),
		FOREIGN KEY (userId) REFERENCES users(id),
		CONSTRAINT month_constraint CHECK (month >= 1 AND month <= 12),
		CONSTRAINT day_constraint CHECK (day >= 1 and day <= 31)
);
`

type Subscription struct {
	ID               int         `db:"id" json:"-"`
	UUID             string      `db:"uuid" json:"uuid"`
	Cost             float32     `db:"cost" json:"cost"`
	PaymentMethod    null.String `db:"paymentMethod" json:"paymentMethod"`
	MonthlyPayment   bool        `db:"monthlyPayment" json:"monthlyPayment"`
	AutomaticPayment bool        `db:"automaticPayment" json:"automaticPayment"`
	UserID           string      `db:"userId" json:"-"`
	ServiceID        string      `db:"serviceId" json:"serviceId"`
	Service          Service     `db:"service" json:"service"`
	Month            int         `db:"month" json:"-"`
	Day              int         `db:"day" json:"-"`
	DueDate          `db:"dueDate" json:"dueDate"`
}

type DueDate struct {
	Day   int `json:"day"`
	Month int `json:"month"`
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

type CategoryCost struct {
	Category string  `db:"category" json:"category"`
	Cost     float32 `db:"cost" json:"cost"`
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
