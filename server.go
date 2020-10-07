package main

import (
	"html/template"
	"net/http"

	"./handlers"
	"./storage"
)

func main() {
	handler := &handlers.Handlers{
		Tmpl: template.Must(template.ParseFiles("index.html")),
	}
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	storage.ReadHistory()
	handlers.HandleRequests(*handler)
}
