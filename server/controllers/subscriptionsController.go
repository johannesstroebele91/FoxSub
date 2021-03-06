package controllers

import (
	"encoding/json"
	"fabulous-fox/db"
	"fabulous-fox/models"
	"net/http"

	"github.com/gorilla/mux"
)

func CreateSubscription(w http.ResponseWriter, r *http.Request) {
	createSubscription := `INSERT INTO subscriptions (uuid, cost, paymentMethod, monthlyPayment, automaticPayment, userId, serviceId, month, day) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`
	var subscription models.Subscription

	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	if subscription.Service.ID != "" {
		subscription.ServiceID = subscription.Service.ID
	}

	results, err := db.DB.Exec(createSubscription, subscription.Cost, subscription.PaymentMethod, subscription.MonthlyPayment, subscription.AutomaticPayment, r.Header.Get("user"), subscription.ServiceID, subscription.DueDate.Month, subscription.DueDate.Day)

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	insertedIndex, err := results.LastInsertId()

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = db.DB.QueryRowx("SELECT * FROM subscriptions WHERE id=?", insertedIndex).StructScan(&subscription)

	subscriptionJSON, err := json.Marshal(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(subscriptionJSON)
}

func GetSubscriptions(w http.ResponseWriter, r *http.Request) {
	subscriptions := []models.Subscription{}
	err := db.DB.Select(&subscriptions, `SELECT services.id "service.id", services.name "service.name", services.category "service.category", day "dueDate.day", month "dueDate.month", cost, uuid, paymentMethod, monthlyPayment, automaticPayment, serviceId FROM subscriptions JOIN services ON services.id = subscriptions.serviceId AND subscriptions.userId=?`, r.Header.Get("user"))

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

func GetSubscription(w http.ResponseWriter, r *http.Request) {
	const getQuery = `SELECT services.id "service.id", services.name "service.name", services.category "service.category", uuid, cost ,paymentMethod, monthlyPayment, automaticPayment, serviceId, day "dueDate.day", month "dueDate.month" FROM subscriptions JOIN services ON services.id = subscriptions.serviceId AND subscriptions.userId=? AND subscriptions.uuid=?`

	var subscription models.Subscription
	subscriptionUUID := mux.Vars(r)["uuid"]

	result := db.DB.QueryRowx(getQuery, r.Header.Get("user"), subscriptionUUID)
	err := result.StructScan(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	subscriptionJSON, err := json.Marshal(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Write(subscriptionJSON)
}

func UpdateSubscription(w http.ResponseWriter, r *http.Request) {
	const updateQuery = `UPDATE subscriptions SET cost=?, monthlyPayment=?, paymentMethod=?, automaticPayment=?, serviceId=? WHERE uuid=? AND userId=?`

	var subscription models.Subscription

	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	subscription.UserID = r.Header.Get("user")

	if subscription.Service.ID != "" {
		subscription.ServiceID = subscription.Service.ID
	}

	_, err = db.DB.Queryx(updateQuery, subscription.Cost, subscription.MonthlyPayment, subscription.PaymentMethod, subscription.AutomaticPayment, subscription.ServiceID, subscription.UUID, subscription.UserID)

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	subscriptionJSON, _ := json.Marshal(&subscription)

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	w.Write(subscriptionJSON)
}

func DeleteSubscription(w http.ResponseWriter, r *http.Request) {
	const deleteQuery = `DELETE FROM subscriptions WHERE uuid=? AND userId=?`

	subscriptionUUID := mux.Vars(r)["uuid"]

	if subscriptionUUID == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err := db.DB.Query(deleteQuery, subscriptionUUID, r.Header.Get("user"))

	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}
}
