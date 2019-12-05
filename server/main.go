package main

import (
	"encoding/json"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

var userSchema = `
CREATE TABLE IF NOT EXISTS user (
	userID INTEGER PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	goal DECIMAL,
	monthlyCumulatedPayment DECIMAL,
	nextDueDate DATETIME,
	subscriptionCounter INTEGER
);
`

var serviceSchema = `
CREATE TABLE IF NOT EXISTS service (
	serviceID INTEGER PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	imageUrl VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL
);
`

var subscriptionSchema = `
CREATE TABLE IF NOT EXISTS subscription (
	subscriptionID INTEGER PRIMARY KEY,
	cost DECIMAL NOT NULL,
	dueDate DATE,
	monthlyPayment BOOLEAN NOT NULL,
	automaticPayment BOOLEAN NOT NULL,
	userID INTEGER NOT NULL,
	serviceID INTEGER NOT NULL,
	FOREIGN KEY (userID) REFERENCES user(userID),
	FOREIGN KEY (serviceID) REFERENCES service(serviceID)
);
`

var db *sqlx.DB

func main() {
	db, err := sqlx.Connect("mysql", "root:password@tcp(127.0.0.1:3306)/fabulous-fox")

	db.MustExec(userSchema)
	db.MustExec(serviceSchema)
	db.MustExec(subscriptionSchema)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	router := mux.NewRouter()
	apiSubrouter := router.PathPrefix("/api").Subrouter()
	v1Subrouter := apiSubrouter.PathPrefix("/v1").Subrouter()
	v1Subrouter.Use(Authenticator())
	v1Subrouter.HandleFunc("/test", Test).Methods("GET")
	apiSubrouter.HandleFunc("/signin", signin).Methods("POST")

	http.ListenAndServe(":3000", router)
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func signin(w http.ResponseWriter, r *http.Request) {
	/**
	* @TODO add validation for credentials
	*/
	var credentials Credentials

	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil {
		w.WriteHeader((http.StatusBadRequest))
		return
	}

	expectedPassword := "password"

	if expectedPassword != credentials.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	sessionToken := uuid.NewV4().String()

	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   sessionToken,
		Expires: time.Now().Add(3600 * time.Second),
	})
}

func Authenticator() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			c, err := r.Cookie("session_token")
			if err != nil {
				if err == http.ErrNoCookie {
					w.WriteHeader(http.StatusUnauthorized)
					return
				}

				w.WriteHeader(http.StatusBadRequest)
				return
			}

			if c.Expires.After(time.Now()) {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func Test(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("a"))
}

func Register(w http.ResponseWriter, r *http.Request) {
	var credentials: Credcredentials

	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil {
		w.WriteHeader((http.StatusBadRequest))
		return
	}
}
