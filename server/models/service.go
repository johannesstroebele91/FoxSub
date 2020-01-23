package models

import "gopkg.in/guregu/null.v3"

type Service struct {
	ID       string      `db:"id" json:"uuid"`
	Name     string      `db:"name" json:"name"`
	ImageURL null.String `db:"imageURL" json:"imageURL"`
	Category string      `db:"category" json:"category"`
}
