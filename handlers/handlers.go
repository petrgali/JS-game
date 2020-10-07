package handlers

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"../storage"
)

type Handlers struct {
	Tmpl *template.Template
}

func (h *Handlers) scoreBoard(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(storage.Players)
}
func (h *Handlers) index(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err == nil {
		storage.CreatePlayer(reqBody)
	}
	if err := h.Tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 500)
	}
}

func HandleRequests(handler Handlers) {
	http.HandleFunc("/", handler.index)
	http.HandleFunc("/scoreboard", handler.scoreBoard)

	log.Fatal(http.ListenAndServe(":8000", nil))
}
