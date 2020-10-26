package middleware

import (
	"log"
	"net/http"
)

type Logger struct {
	Handler http.Handler
}

func (l *Logger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	l.Handler.ServeHTTP(w, r)
	log.Printf("[%s] %s", r.Method, r.URL.Path)
}

func NewLogger(wrappedHandler http.Handler) *Logger {
	return &Logger{wrappedHandler}
}
