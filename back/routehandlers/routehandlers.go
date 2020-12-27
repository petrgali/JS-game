package routehandlers

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"make-your-game-back/database"
	"make-your-game-back/models"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

/*Handlers - basic handler stuct*/
type Handlers struct {
	Tmpl       *template.Template
	FileServer http.Handler
	DB         *database.DBconn
}

func Init() *http.Handler {
	handler := &Handlers{
		Tmpl:       template.Must(template.ParseFiles("./index.html")),
		FileServer: http.FileServer(http.Dir("../static")),
		DB:         database.DB,
	}
	r := mux.NewRouter()
	r.HandleFunc("/", handler.Index).Methods("GET")
	r.HandleFunc("/scoreboard", handler.GetData).Methods("GET")
	r.HandleFunc("/scoreboard", handler.SetData).Methods("POST")
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", handler.FileServer))
	loggerMux := handlers.LoggingHandler(os.Stdout, r)
	return &loggerMux
}

/*GetData - API data  getter*/
func (h *Handlers) GetData(w http.ResponseWriter, r *http.Request) {
	data, err := h.DB.ReadStat()
	if err != nil {
		w.WriteHeader(400)
		log.Printf("DB: read failed. Reason: %s", err.Error())
		return
	}
	w.Header().Add("Content-Type", "application/json")
	stat, _ := json.MarshalIndent(data, "", "")
	json.NewEncoder(w).Encode(data)
}

/*SetData - API data setter*/
func (h *Handlers) SetData(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(400)
		log.Printf("API: read request failed. Reason: %s", err.Error())
		return
	}
	fatal, body := models.ValidateStat(reqBody)
	if fatal != "" {
		w.WriteHeader(400)
		log.Printf("API: set data failed. Reason: %s", fatal)
		return
	}
	if err = h.DB.CreateStat(body); err != nil {
		w.WriteHeader(400)
		log.Printf("DB: create failed. Reason: %s", err)
	}
}

/*Index - default handler*/
func (h *Handlers) Index(w http.ResponseWriter, r *http.Request) {
	if err := h.Tmpl.Execute(w, nil); err != nil {
		log.Fatal(err)
	}
}
