package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"./server/handlers"
	"./server/middleware"
	"./server/storage"
)

func main() {
	handler := &handlers.Handlers{
		Tmpl:       template.Must(template.ParseFiles("index.html")),
		FileServer: http.FileServer(http.Dir("./static")),
	}
	storage.ReadHistory()

	mux := http.NewServeMux()
	mux.HandleFunc("/", handler.Index)
	mux.HandleFunc("/scoreboard", handler.ScoreBoard)
	mux.Handle("/static/", http.StripPrefix("/static/", handler.FileServer))
	loggerMux := middleware.NewLogger(mux)

	fmt.Println("SERVER is listening on port:8080")
	log.Fatal(http.ListenAndServe(":8000", loggerMux))
}
