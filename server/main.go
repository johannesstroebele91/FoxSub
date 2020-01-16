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

	db.MustExec(UsersSchema)
	db.MustExec(CategoriesSchema)
	db.MustExec(ServicesSchema)
	db.MustExec(SubscriptionsSchema)
	db.MustExec(SessionsSchema)

	fmt.Println("db :", db)

	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()
	router.Use(CommonMiddleware())
	apiSubrouter := router.PathPrefix("/api").Subrouter()
	v1Subrouter := apiSubrouter.PathPrefix("/v1").Subrouter()
	v1Subrouter.Use(Authenticator())
	v1Subrouter.HandleFunc("/test", AuthTest).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions", CreateSubscription).Methods("POST")
	v1Subrouter.HandleFunc("/subscriptions", GetSubscriptions).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", UpdateSubscription).Methods("PUT")
	v1Subrouter.HandleFunc("/subscriptions/general", GetCostForCategories).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions", DeleteSubscription).Methods("DELETE")

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

	row := db.QueryRowx("SELECT * FROM users WHERE email=?", credentials.Email)
	var user User
	row.StructScan(&user)

	expectedPassword := user.Password

	if expectedPassword != credentials.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	createSession := `INSERT INTO sessions (ID, userId) VALUES (?, ?)`

	sessionToken := uuid.NewV4().String()

	results := db.MustExec(createSession, sessionToken, user.ID)

	affectedRows, err := results.RowsAffected()

	if err != nil || affectedRows <= 0 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fmt.Print(affectedRows)

	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   sessionToken,
		Expires: time.Now().Add(3600 * time.Second),
	})
}

func Authenticator() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sessionToken, err := r.Cookie("session_token")
			if err != nil {
				if err == http.ErrNoCookie {
					w.WriteHeader(http.StatusUnauthorized)
					return
				}

				w.WriteHeader(http.StatusBadRequest)
				return
			}

			if sessionToken.Expires.After(time.Now()) {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			row := db.QueryRowx("SELECT * FROM sessions WHERE id=?", sessionToken.Value)
			var session Session
			err = row.StructScan(&session)
			if err != nil || session.UserID == "" {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			r.Header.Set("user", session.UserID)

			next.ServeHTTP(w, r)
		})
	}
}

func AuthTest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("a"))
}

func Register(w http.ResponseWriter, r *http.Request) {
	createUser := `INSERT INTO users (id, firstName, email, password) VALUES (UUID(), ?, ?, ?)`
	var credentials Credentials

	err := json.NewDecoder(r.Body).Decode(&credentials)
	fmt.Println(&credentials)

	if err != nil || credentials.Email == "" || credentials.Password == "" {
		fmt.Println("noooO", err, credentials)

		w.WriteHeader((http.StatusBadRequest))
		return
	}

	results := db.MustExec(createUser, "myuser", credentials.Email, credentials.Password)

	if results == nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func CreateSubscription(w http.ResponseWriter, r *http.Request) {
	createSubscription := `INSERT INTO subscriptions (uuid, cost, paymentMethod, monthlyPayment, automaticPayment, userId, serviceId) VALUES (UUID(), ?, ?, ?, ?, ?, ?)`
	var subscription Subscription

	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	if subscription.Service.ID != "" {
		subscription.ServiceID = subscription.Service.ID
	}

	results := db.MustExec(createSubscription, subscription.Cost, subscription.PaymentMethod, subscription.MonthlyPayment, subscription.AutomaticPayment, r.Header.Get("user"), subscription.ServiceID)

	insertedIndex, err := results.LastInsertId()

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	err = db.QueryRowx("SELECT * FROM subscriptions WHERE id=?", insertedIndex).StructScan(&subscription)

	subscriptionJSON, err := json.Marshal(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(subscriptionJSON)
}

func GetSubscriptions(w http.ResponseWriter, r *http.Request) {
	subscriptions := []Subscription{}
	err := db.Select(&subscriptions, `SELECT services.id "service.id", services.name "service.name", services.category "service.category", subscriptions.* FROM subscriptions JOIN services ON services.id = subscriptions.serviceId AND subscriptions.userId=?`, r.Header.Get("user"))

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	subscriptionsJSON, err := json.Marshal(&subscriptions)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(subscriptionsJSON)
}

func UpdateSubscription(w http.ResponseWriter, r *http.Request) {
	const updateQuery = `UPDATE subscriptions SET cost=?, dueDate=?, monthlyPayment=?, paymentMethod=?, automaticPayment=?, serviceId=? WHERE uuid=? AND userId=?`

	var subscription Subscription

	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	subscription.UserID = r.Header.Get("user")

	if subscription.Service.ID != "" {
		subscription.ServiceID = subscription.Service.ID
	}

	_, err = db.Queryx(updateQuery, subscription.Cost, subscription.DueDate, subscription.MonthlyPayment, subscription.PaymentMethod, subscription.AutomaticPayment, subscription.ServiceID, subscription.UUID, subscription.UserID)

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	subscriptionJSON, _ := json.Marshal(&subscription)

	if err != nil {
		// TODO think about error response? is it rly needed
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	w.Write(subscriptionJSON)
}

func DeleteSubscription(w http.ResponseWriter, r *http.Request) {
	const deleteQuery = `DELETE FROM subscriptions WHERE uuid=? AND userId=?`

	var subscription Subscription

	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil || subscription.UUID == "" {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	_, err = db.Query(deleteQuery, subscription.UUID, r.Header.Get("user"))

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}
}

// CommonMiddleware used on router to set the Content-Type header to application/json for every route
func CommonMiddleware() func(http http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		})
	}
}

func GetCostForCategories(w http.ResponseWriter, r *http.Request) {
	const getQuery = `SELECT category, SUM(cost) "cost" FROM subscriptions JOIN services ON subscriptions.serviceId = services.id AND subscriptions.userId=? GROUP BY serviceId`

	fmt.Println("here")
	var categoriesCost []CategoryCost

	err := db.Select(&categoriesCost, getQuery, r.Header.Get("user"))

	fmt.Println(err)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	subscriptionsJSON, err := json.Marshal(&categoriesCost)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(subscriptionsJSON)
}
