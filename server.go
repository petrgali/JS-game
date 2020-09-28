package main

import (
	"html/template"
	"net/http"
)

func main() {
	http.HandleFunc("/scoreboard", scoreHandler)
	http.HandleFunc("/", indexHandler)

	fs := http.FileServer(http.Dir("./static/"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}

func scoreHandler(w http.ResponseWriter, r *http.Request) {
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("./index.html")
	t.Execute(w, nil)
}
