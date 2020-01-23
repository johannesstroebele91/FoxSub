package main

import (
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB = CreateDBConnection()

func main() {
	router := mux.NewRouter()
	router.Use(CommonMiddleware())
	apiSubrouter := router.PathPrefix("/api").Subrouter()
	v1Subrouter := apiSubrouter.PathPrefix("/v1").Subrouter()
	v1Subrouter.Use(Authenticator())
	v1Subrouter.HandleFunc("/subscriptions", CreateSubscription).Methods("POST")
	v1Subrouter.HandleFunc("/subscriptions", GetSubscriptions).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", UpdateSubscription).Methods("PUT")
	v1Subrouter.HandleFunc("/subscriptions/general", GetCostForCategories).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions", DeleteSubscription).Methods("DELETE")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", GetSubscription).Methods("GET")
	v1Subrouter.HandleFunc("/user", GetUser).Methods("GET")
	v1Subrouter.HandleFunc("/user/goal", UpdateGoal).Methods("PUT")
	v1Subrouter.HandleFunc("/services", GetServices).Methods("GET")

	apiSubrouter.HandleFunc("/login", SignIn).Methods("POST")
	apiSubrouter.HandleFunc("/register", Register).Methods("POST")

	http.ListenAndServe(GetEnv("PORT", ":3000"), router)

	defer DB.Close()
}
