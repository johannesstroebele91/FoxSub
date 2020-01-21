package models

type CategoryCost struct {
	Category string  `db:"category" json:"category"`
	Cost     float32 `db:"cost" json:"cost"`
}
