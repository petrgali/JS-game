package routehandlers

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"make-your-game-back/models"
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
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(400)
		fmt.Println(err.Error())
		return
	}
	if err, ok := models.CreatePlayer(reqBody); !ok {
		w.WriteHeader(400)
		fmt.Println(err)
		return
	}
}

/*Index - default handler*/
func (h *Handlers) Index(w http.ResponseWriter, r *http.Request) {
	if err := h.Tmpl.Execute(w, nil); err != nil {
		log.Fatal(err)
	}
}
