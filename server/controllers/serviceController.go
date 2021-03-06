package controllers

import (
	"encoding/json"
	"fabulous-fox/db"
	"fabulous-fox/models"
	"net/http"
)

func GetServices(w http.ResponseWriter, r *http.Request) {
	const getUserQuery = `SELECT * FROM services`

	services := []models.Service{}

	err := db.DB.Select(&services, getUserQuery)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	servicesJSON, err := json.Marshal(&services)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Write(servicesJSON)
}
