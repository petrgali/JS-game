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

func Init(conn *database.DBconn) *http.Handler {
	handler := &Handlers{
		Tmpl:       template.Must(template.ParseFiles("./index.html")),
		FileServer: http.FileServer(http.Dir("../static")),
		DB:         conn,
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
		w.WriteHeader(http.StatusInternalServerError)
		log.Printf("DB: read entries failed. Reason: %s", err.Error())
		return
	}
	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Printf("API: JSON encode failed. Reason: %s", err.Error())
		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}

/*SetData - API data setter*/
func (h *Handlers) SetData(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Printf("API: read request failed. Reason: %s", err.Error())
		return
	}
	fatal, body := models.ValidateStat(reqBody)
	if fatal != "" {
		w.WriteHeader(http.StatusBadRequest)
		log.Printf("API: data validation failed. Reason: %s", fatal)
		return
	}
	if err = h.DB.CreateStat(body); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Printf("DB: create new entry failed. Reason: %s", err)
	}
}

/*Index - default handler*/
func (h *Handlers) Index(w http.ResponseWriter, r *http.Request) {
	if err := h.Tmpl.Execute(w, nil); err != nil {
		log.Fatal(err)
	}
}
