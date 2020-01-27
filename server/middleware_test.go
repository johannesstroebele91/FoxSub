package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gorilla/mux"
)

func TestAuthenticator(t *testing.T) {

	t.Run("Return fetches user id in header", func(t *testing.T) {
		router := mux.NewRouter()
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			user := r.Header.Get("user")

			if user == "" {
				t.Error("No user header added")
			}
		})
		router.Use(Authenticator())
		router.HandleFunc("/", nextHandler).Methods("GET")

		req := httptest.NewRequest("GET", "/", nil)
		req.AddCookie(&http.Cookie{
			Name:    "session_token",
			Value:   "129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7d",
			Expires: time.Now().Add(3600 * time.Second),
		})

		router.ServeHTTP(httptest.NewRecorder(), req)
	})

	t.Run("Return fetches user id in header", func(t *testing.T) {
		router := mux.NewRouter()
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			user := r.Header.Get("user")

			if user == "" {
				t.Error("No user header added")
			}
		})
		router.Use(Authenticator())
		router.HandleFunc("/", nextHandler).Methods("GET")

		req := httptest.NewRequest("GET", "/", nil)
		req.AddCookie(&http.Cookie{
			Name:    "session_token",
			Value:   "129f7f2c-9a8a-4e63-94a1-cc3bd2f8cc7d",
			Expires: time.Now().Add(3600 * time.Second),
		})

		router.ServeHTTP(httptest.NewRecorder(), req)
	})

	t.Run("should return Unauthorized if no cookie provided", func(t *testing.T) {
		router := mux.NewRouter()
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			code := r.Response.StatusCode

			if code != http.StatusUnauthorized {
				t.Errorf("handler returned wrong status code: got %v want %v", code, http.StatusUnauthorized)
			}
		})
		router.Use(Authenticator())
		router.HandleFunc("/", nextHandler).Methods("GET")

		req := httptest.NewRequest("GET", "/", nil)

		router.ServeHTTP(httptest.NewRecorder(), req)
	})

	t.Run("should return Unauthorized if session token doesn't exist", func(t *testing.T) {
		router := mux.NewRouter()
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			code := r.Response.StatusCode

			if code != http.StatusUnauthorized {
				t.Errorf("handler returned wrong status code: got %v want %v", code, http.StatusUnauthorized)
			}
		})
		router.Use(Authenticator())
		router.HandleFunc("/", nextHandler).Methods("GET")

		req := httptest.NewRequest("GET", "/", nil)
		req.AddCookie(&http.Cookie{
			Name:    "session_token",
			Value:   "randomtoken",
			Expires: time.Now().Add(3600 * time.Second),
		})

		router.ServeHTTP(httptest.NewRecorder(), req)
	})
}

func TestCommonMiddleware(t *testing.T) {
	t.Run("Should add Content-Type header", func(t *testing.T) {
		router := mux.NewRouter()
		nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := w.Header().Get("Content-Type")

			if header != "application/json" {
				t.Error("Content-Type is not application/json")
			}
		})
		router.Use(CommonMiddleware())
		router.HandleFunc("/", nextHandler).Methods("GET")

		req := httptest.NewRequest("GET", "/", nil)

		router.ServeHTTP(httptest.NewRecorder(), req)
	})
}
