package routehandlers

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"net/http"

	"../models"
)

/*Handlers - basic handler stuct*/
type Handlers struct {
	Tmpl       *template.Template
	FileServer http.Handler
}

/*GetData - API data  getter*/
func (h *Handlers) GetData(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Players)
}

/*SetData - API data setter*/
func (h *Handlers) SetData(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	models.CreatePlayer(reqBody)
}

/*Index - default handler*/
func (h *Handlers) Index(w http.ResponseWriter, r *http.Request) {
	h.Tmpl.Execute(w, nil)
}
