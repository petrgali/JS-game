package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"

	procs "./server/handlers"
	"./server/storage"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	handler := &procs.Handlers{
		Tmpl:       template.Must(template.ParseFiles("index.html")),
		FileServer: http.FileServer(http.Dir("./static")),
	}
	storage.ReadHistory()

	r := mux.NewRouter()
	r.HandleFunc("/", handler.Index).Methods("GET")
	r.HandleFunc("/scoreboard", handler.GetData).Methods("GET")
	r.HandleFunc("/scoreboard", handler.SetData).Methods("POST")
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", handler.FileServer))

	loggerMux := handlers.LoggingHandler(os.Stdout, r)

	fmt.Println("SERVER is listening on port:8000")
	http.ListenAndServe(":8000", loggerMux)
}
