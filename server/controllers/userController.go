package controllers

import (
	"encoding/json"
	"fabulous-fox/db"
	"fabulous-fox/models"
	"fmt"
	"net/http"
	"time"

	"log"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	const getUserQuery = `SELECT users.*, day "dueDate.day", month "dueDate.month", d.monthlyCumulatedPayment FROM users CROSS JOIN (SELECT SUM(CASE WHEN subscriptions.monthlyPayment = 1 THEN subscriptions.cost ELSE subscriptions.cost / 12 END) "monthlyCumulatedPayment" FROM subscriptions WHERE subscriptions.userId=? GROUP BY subscriptions.userId) d JOIN subscriptions ON subscriptions.userId=users.id WHERE userId=? ORDER BY month, day ASC`

	users := []models.User{}

	err := db.DB.Select(&users, getUserQuery, r.Header.Get("user"), r.Header.Get("user"))

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}

	user, err := findClosestDate(users)
	if err != nil {
		err = db.DB.Select(&users, `SELECT * FROM users WHERE userId=?`, r.Header.Get("user"))
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

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	rows, err := db.DB.Queryx(updateQuery, user.Goal, r.Header.Get("user"))
	rows.Close()

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func findClosestDate(users []models.User) (models.User, error) {
	if len(users) < 1 {
		log.Println("No user or subscriptions")
		return models.User{}, fmt.Errorf("No user or subscriptions")
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
