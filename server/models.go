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
)

CREATE TABLE subscription (
	subscriptionID int NOT NULL UNIQUE,
	cost decimal NOT NULL,
	dueDate date,
	category varchar(255) NOT NULL,
	monthlyPayment boolean NOT NULL,
	automaticPayment bolean NOT NULL,
	FOREIGN KEY (userID) REFERENCES user(userID),
	FOREIGN KEY (serviceID) REFERENCES service(serviceID)
);

CREATE TABLE service (
	serviceID int NOT NULL UNIQUE,
	name varchar(255) NOT NULL,
	imageUrl varchar(255) NOT NULL
)`

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

type Subscription struct {
	Cost             float32   `db:"cost"`
	DueDate          time.Time `db:"dueDate"`
	Category         string    `db:"category"`
	MonthlyPayment   bool      `db:"monthlyPayment"`
	AutomaticPayment bool      `db:"automaticPayment"`
	UserID           uint16    `db:"userID"`
	ServiceID        uint16    `db:"serviceID"`
}

type Service struct {
	Name     string `db:"name"`
	ImageUrl string `db:"imageUrl"`
}
