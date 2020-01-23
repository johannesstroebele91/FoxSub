package main

import (
	"encoding/json"
	"fabulous-fox/models"
	"fmt"
	"net/http"
	"time"

	uuid "github.com/satori/go.uuid"
)

// SignIn route function to handle user singing
// If user login was successful return a cookie and saves the session token to the database
func SignIn(w http.ResponseWriter, r *http.Request) {
	var credentials models.Credentials

	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil || credentials.Email == "" || credentials.Password == "" {
		w.WriteHeader((http.StatusBadRequest))
		return
	}

	row := DB.QueryRowx("SELECT * FROM users WHERE email=?", credentials.Email)
	var user models.User
	row.StructScan(&user)

	expectedPassword := user.Password

	if expectedPassword != credentials.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	createSession := `INSERT INTO sessions (ID, userId) VALUES (?, ?)`

	sessionToken := uuid.NewV4().String()

	results := DB.MustExec(createSession, sessionToken, user.ID)

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

func Register(w http.ResponseWriter, r *http.Request) {
	createUser := `INSERT INTO users (id, firstName, lastName, email, password) VALUES (UUID(), ?, ?,?, ?)`
	var credentials models.Credentials

	err := json.NewDecoder(r.Body).Decode(&credentials)
	fmt.Println(&credentials)

	if err != nil || credentials.Email == "" || credentials.Password == "" {
		w.WriteHeader((http.StatusBadRequest))
		return
	}

	results := DB.MustExec(createUser, "myuser", "myuser", credentials.Email, credentials.Password)

	if results == nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	w.WriteHeader(http.StatusOK)
}
