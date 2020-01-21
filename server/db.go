package main

import "github.com/jmoiron/sqlx"

import "log"

func CreateDBConnection() *sqlx.DB {
	var db *sqlx.DB
	var err error

	db, err = sqlx.Connect("mysql", "root:password@tcp(127.0.0.1:3306)/fabulous-fox-dev")

	if err != nil {
		log.Println("Can't establish connection to maria db", err)
	} else {
		log.Println("Connected to maria db")
	}

	return db
}
