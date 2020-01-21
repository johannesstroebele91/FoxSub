package models

import "gopkg.in/guregu/null.v3"

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
