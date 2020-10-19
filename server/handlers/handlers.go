package handlers

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"net/http"

	"../storage"
)

type Handlers struct {
	Tmpl       *template.Template
	FileServer http.Handler
}

func (h *Handlers) ScoreBoard(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(storage.Players)
}
func (h *Handlers) Index(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err == nil {
		storage.CreatePlayer(reqBody)
	}
	if err := h.Tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 500)
	}
}
