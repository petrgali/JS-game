package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func main() {
	http.HandleFunc("/", indexHandler)
	err := http.ListenAndServe(":8000", nil)
	fs := http.FileServer(http.Dir("/"))
	http.Handle("/sample/", http.StripPrefix("/sample/", fs))
	if err != nil {
		fmt.Println("Listen & Serve", err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("./index.html")
	t.Execute(w, nil)
}
