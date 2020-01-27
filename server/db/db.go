package db

import (
	"fabulous-fox/utility"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func init() {
	DB = createDBConnection()
}

func createDBConnection() *sqlx.DB {
	var db *sqlx.DB
	dbIP := utility.GetEnv("MARIA_DB", "root:password@tcp(127.0.0.1:3306)/fabulous-fox")

	fmt.Println(dbIP)
	db, err := retry(10, time.Second*5, func() (*sqlx.DB, error) {
		dbConnection, dbConnectionError := sqlx.Connect("mysql", dbIP)
		if dbConnectionError != nil {
			log.Println("Retry db connection", dbIP)
		}
		return dbConnection, dbConnectionError
	})

	if err != nil {
		log.Fatalln("Can not connect to DB")

	} else {
		log.Println("Connected to DB")
	}

	return db
}

func retry(attemps int, sleep time.Duration, fn func() (*sqlx.DB, error)) (*sqlx.DB, error) {

	db, err := fn()

	if err != nil {
		if attemps--; attemps > 0 {
			time.Sleep(sleep)
			return retry(attemps, sleep, fn)
		}

		return nil, err
	}

	return db, nil
}
