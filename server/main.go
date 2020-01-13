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

	db.MustExec(UsersSchema)
	db.MustExec(CategoriesSchema)
	db.MustExec(ServicesSchema)
	db.MustExec(SubscriptionsSchema)
	db.MustExec(SessionsSchema)

	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()
	router.Use(CommonMiddleware)
	apiSubrouter := router.PathPrefix("/api").Subrouter()
	v1Subrouter := apiSubrouter.PathPrefix("/v1").Subrouter()

	v1Subrouter.Use(Authenticator())
	v1Subrouter.HandleFunc("/test", AuthTest).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions", CreateSubscription).Methods(("POST"))
	v1Subrouter.HandleFunc("/subscriptions", GetSubscriptions).Methods("GET")
	v1Subrouter.HandleFunc("/subscriptions/{uuid}", UpdateSubscription).Methods("POST")

	apiSubrouter.HandleFunc("/signin", signin).Methods("POST")
	apiSubrouter.HandleFunc("/register", Register).Methods("POST")

	http.ListenAndServe(":3000", router)

	defer db.Close()
}

func signin(w http.ResponseWriter, r *http.Request) {
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

	if results == nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   sessionToken,
		Expires: time.Now().Add(3600 * time.Second),
	})
}

func Authenticator() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sessionCookie, err := r.Cookie("session_token")
			if err != nil {
				if err == http.ErrNoCookie {
					w.WriteHeader(http.StatusUnauthorized)
					return
				}

				w.WriteHeader(http.StatusBadRequest)
				return
			}

			if sessionCookie.Expires.After(time.Now()) {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			row := db.QueryRowx("SELECT * FROM sessions WHERE id=?", sessionCookie.Value)
			var session Session
			err = row.StructScan(&session)
			if err != nil || sessionCookie.Value == "" {
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

	if err != nil || credentials.Email == "" || credentials.Password == "" {
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
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	results := db.MustExec(createSubscription, subscription.Cost, subscription.PaymentMethod, subscription.MonthlyPayment, subscription.AutomaticPayment, r.Header.Get("user"), subscription.ServiceID)

	insertedIndex, err := results.LastInsertId()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
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
	err := db.Select(&subscriptions, `SELECT services.name "service.name", services.category "service.category", subscriptions.* FROM subscriptions JOIN services ON services.id = subscriptions.serviceId AND subscriptions.userId=?`, r.Header.Get("user"))

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
	const updateQuery = `UPDATE subscriptions SET cost=:cost, dueDate=:dueDate, monthlyPayment=: montlyPayment, automaticPayment=:paymentMethod, serviceId=:serviceId WHERE uuid=:uuid AND userId=:userId`

	subscirptionUUID := mux.Vars(r)["uuid"]

	var subscription Subscription

	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println(w, "test", subscirptionUUID)
}

// CommonMiddleware used on router to set the Content-Type header to application/json for every route
func CommonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
