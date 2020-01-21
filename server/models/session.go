package models

type Session struct {
	ID     string `db:"id" json:"uuid"`
	UserID string `db:"userId" json:"userId"`
}
