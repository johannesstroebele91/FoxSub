package main

import (
	_ "database/sql"
	"time"

	_ "github.com/lib/pq"
)

var UsersSchema = `
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    goal DECIMAL NULL,
    monthlyCumulatedPayment DECIMAL NULL,
    nextDueDate DATETIME NULL,
    subscriptionCounter INTEGER NULL
);
`

type User struct {
	ID                      string    `db:"id"`
	FirstName               string    `db:"first_name"`
	LastName                string    `db:"last_name"`
	Email                   string    `db:"email"`
	Password                string    `db:"password"`
	Goal                    float64   `db:"goal"`
	MonthlyCumulatedPayment float64   `db:"monthlyCumulatedPayment"`
	NextDueDate             time.Time `db:"nextDueDate"`
	SubscriptionCounter     int32     `db:"subscriptionCounter,omitempty"`
}

var SubscriptionsSchema = `
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY,
    cost DECIMAL NOT NULL,
    dueDate DATE,
    monthlyPayment BOOLEAN NOT NULL,
    automaticPayment BOOLEAN NOT NULL,
    user_id VARCHAR(36),
    FOREIGN KEY (users_id) REFERENCES users(id)
);
`

type Subscription struct {
	Cost             float32   `db:"cost"`
	DueDate          time.Time `db:"dueDate"`
	MonthlyPayment   bool      `db:"monthlyPayment"`
	AutomaticPayment bool      `db:"automaticPayment"`
	UserID           string    `db:"user_id"`
	ServiceID        uint16    `db:"serviceID"`
}

var ServicesSchema = `
`

type Service struct {
	Name     string `db:"name"`
	ImageURL string `db:"imageUrl"`
	Category string `db:"category"`
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var SessionsSchema = `
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(36) PRIMARY KEY,
	user_id VARCHAR(36) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);`

type Session struct {
	ID     string `db:"id"`
	UserID string `db:"user_id"`
}
