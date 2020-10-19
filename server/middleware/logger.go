package middleware

import (
	"log"
	"net/http"
)

type Logger struct {
	http.Handler
}

func (l *Logger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// start := time.Now()
	l.Handler.ServeHTTP(w, r)
	log.Printf("%s %s", r.Method, r.URL.Path)
}

func NewLogger(wrappedHandler http.Handler) *Logger {
	return &Logger{wrappedHandler}
}
