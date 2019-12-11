package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

var db *sqlx.DB

func main() {
	var err error
	db, err = sqlx.Connect("mysql", "root:password@tcp(127.0.0.1:3306)/fabulous-fox")
	// err = db.Ping()
	fmt.Println("err", err)

	db.MustExec(UserSchema)
	// db.MustExec(ServiceSchema)
	db.MustExec(SubscriptionSchema)

	fmt.Println("db :", db)

	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()
	apiSubrouter := router.PathPrefix("/api").Subrouter()
	v1Subrouter := apiSubrouter.PathPrefix("/v1").Subrouter()
	v1Subrouter.Use(Authenticator())
	v1Subrouter.HandleFunc("/test", Test).Methods("GET")
	apiSubrouter.HandleFunc("/signin", signin).Methods("POST")
	apiSubrouter.HandleFunc("/register", Register).Methods("POST")

	http.ListenAndServe(":3000", router)

	defer db.Close()
}

func signin(w http.ResponseWriter, r *http.Request) {
	/**
	* @TODO add validation for credentials
	 */
	var credentials Credentials

	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil || credentials.Email == "" || credentials.Password == "" {
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

			next.ServeHTTP(w, r)<
		})
	}
}

func Test(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("a"))
}

func Register(w http.ResponseWriter, r *http.Request) {
	fmt.Println("thereyougo", db)
	fmt.Println("")

	createuser := `INSERT INTO user (userID, first_name, email, password) VALUES (UUID(), ?, ?, ?)`
	var credentials Credentials

	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil || credentials.Email == "" || credentials.Password == "" {
		fmt.Println("noooO", err, credentials)

		w.WriteHeader((http.StatusBadRequest))
		return
	}

	results := db.MustExec(createuser, "myuser", "email", "password")
	// fmt.Println("hihi", results)

	if results == nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	w.WriteHeader(http.StatusOK)
}
