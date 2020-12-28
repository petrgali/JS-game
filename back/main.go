package main

import (
	"log"
	"make-your-game-back/database"
	"make-your-game-back/routehandlers"
	"net/http"
	"os"
	"time"
)

func main() {
	db, err := database.Init(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Printf("Database connection failed. Reason: %s", err.Error())
	}
	mux := routehandlers.Init(db)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("PORT set to default value `8080`. Reason: %s", "%PORT not set.")
	}
	s := &http.Server{
		Addr:           ":" + port,
		Handler:        *mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Printf("server is listening on port" + s.Addr)
	if err := s.ListenAndServe(); err != nil {
		log.Printf("Server startup failed. Reason: %s", err.Error())
	}

}
