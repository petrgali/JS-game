package procs

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"../storage"
)

type Handlers struct {
	Tmpl       *template.Template
	FileServer http.Handler
}

func (h *Handlers) GetData(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(storage.Players)
}
func (h *Handlers) SetData(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
	}
	storage.CreatePlayer(reqBody)
}

func (h *Handlers) Index(w http.ResponseWriter, r *http.Request) {
	if err := h.Tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 500)
	}
}
