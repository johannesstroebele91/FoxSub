package main

import (
	"fabulous-fox/models"
	"net/http"
	"time"
)

// CommonMiddleware used on router to set the Content-Type header to application/json for every route
func CommonMiddleware() func(http http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		})
	}
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

			row := DB.QueryRowx("SELECT * FROM sessions WHERE id=?", sessionToken.Value)
			var session models.Session
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
