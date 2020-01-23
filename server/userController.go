package main

import (
	"encoding/json"
	"fabulous-fox/models"
	"fmt"
	"net/http"
	"time"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	const getUserQuery = `SELECT users.*, day "dueDate.day", month "dueDate.month", d.monthlyCumulatedPayment FROM users 	CROSS JOIN (SELECT SUM(CASE WHEN subscriptions.monthlyPayment = 1 THEN subscriptions.cost ELSE subscriptions.cost / 12 END) "monthlyCumulatedPayment" FROM subscriptions WHERE subscriptions.userId=? GROUP BY subscriptions.userId) d JOIN subscriptions ON subscriptions.userId=users.id WHERE userId=? ORDER BY month, day ASC`

	users := []models.User{}

	err := DB.Select(&users, getUserQuery, r.Header.Get("user"), r.Header.Get("user"))

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	user, err := findClosestDate(users)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	userJSON, err := json.Marshal(user)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Write(userJSON)
}

func UpdateGoal(w http.ResponseWriter, r *http.Request) {
	const updateQuery = `UPDATE users SET goal=? WHERE id=?`

	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil || user.Goal.IsZero() || !user.Goal.Valid || user.Goal.Float64 >= 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err = DB.Queryx(updateQuery, user.Goal, r.Header.Get("user"))

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func findClosestDate(users []models.User) (models.User, error) {
	if len(users) < 1 {
		return models.User{}, fmt.Errorf("No user")
	}
	currentDate := time.Now()
	month := int(currentDate.Month())
	day := currentDate.Day()

	for _, user := range users {
		if user.DueDate.Month > month {
			month++
			day = 1
		}
		if user.DueDate.Month == month {
			if user.DueDate.Day >= day {
				return user, nil
			}
		}
	}

	return users[0], nil
}
