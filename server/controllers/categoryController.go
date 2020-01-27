package controllers

import (
	"encoding/json"
	"fabulous-fox/db"
	"fabulous-fox/models"
	"net/http"
)

func GetCostForCategories(w http.ResponseWriter, r *http.Request) {
	const getQuery = `SELECT category, SUM(CASE WHEN subscriptions.monthlyPayment = 1 THEN subscriptions.cost ELSE subscriptions.cost / 12 END) "cost" FROM subscriptions JOIN services ON subscriptions.serviceId = services.id AND subscriptions.userId=? GROUP BY category`

	categoriesCost := []models.CategoryCost{}

	err := db.DB.Select(&categoriesCost, getQuery, r.Header.Get("user"))

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	categoriesJSON, err := json.Marshal(categoriesCost)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(categoriesJSON)
}