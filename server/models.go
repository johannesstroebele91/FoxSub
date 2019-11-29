package main

import (
	_ "database/sql"
	"time"

	_ "github.com/lib/pq"
)

var schema = `
CREATE TABLE user (
	userID INTEGER PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	goal DECIMAL,
	monthlyCumulatedPayment DECIMAL,
	nextDueDate DATETIME,
	subscriptionCounter INTEGER
);`

type User struct {
	FirstName               string    `db:"first_name"`
	LastName                string    `db:"last_name"`
	Email                   string    `db:"email"`
	Password                string    `db:"password"`
	Goal                    float32   `db:"goal"`
	MonthlyCumulatedPayment float32   `db:"monthlyCumulatedPayment"`
	NextDueDate             time.Time `db:"nextDueDate"`
	SubscriptionCounter     uint16    `db:"subscriptionCounter"`
}