package main

import (
	"net/http"

	"fabulous-fox/controllers"
	"fabulous-fox/db"
	"fabulous-fox/utility"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.Use(CommonMiddleware())
	apiSubrouter := router.PathPrefix("/api").Subrouter()
	v1Subrouter := apiSubrouter.PathPrefix("/v1").Subrouter()
	v1Subrouter.Use(Authenticator())
	v1Subrouter.HandleFunc("/subscriptions", controllers.CreateSubscription).Methods("POST")
	v1Subrouter.HandleFunc("/subscriptions", controllers.GetSubscriptions).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", controllers.UpdateSubscription).Methods("PUT")
	v1Subrouter.HandleFunc("/subscriptions/general", controllers.GetCostForCategories).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", controllers.DeleteSubscription).Methods("DELETE")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", controllers.GetSubscription).Methods("GET")
	v1Subrouter.HandleFunc("/user", controllers.GetUser).Methods("GET")
	v1Subrouter.HandleFunc("/user/goal", controllers.UpdateGoal).Methods("PUT")
	v1Subrouter.HandleFunc("/services", controllers.GetServices).Methods("GET")

	apiSubrouter.HandleFunc("/login", controllers.SignIn).Methods("POST")
	apiSubrouter.HandleFunc("/register", controllers.Register).Methods("POST")

	http.ListenAndServe(utility.GetEnv("PORT", ":3000"), router)

	defer db.DB.Close()
}
