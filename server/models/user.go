package models

import (
	"encoding/json"

	"gopkg.in/guregu/null.v3"
)

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
