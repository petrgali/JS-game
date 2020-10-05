package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

/*Player - api json container*/
type Player struct {
	Name      string `json:"name"`
	Destroyed int    `json:"destroyed"`
	Shots     int    `json:"shotsFired"`
	Minutes   int    `json:"munites"`
	Seconds   int    `json:"seconds"`
	Accuracy  string `json:"accuracy"`
	Score     int    `json:"score"`
}
type Handlers struct {
	Tmpl *template.Template
}

/*Players - consist of player api data*/
var Players []Player

func createPlayer(reqBody []byte) {
	var player Player
	json.Unmarshal(reqBody, &player)
	if player.Seconds > 0 {
		Players = append(Players, player)
		sortPlayers()
		// saveResults(reqBody)
		fmt.Println(Players)
	}
}
func saveResults(payload []byte) {
	file, err := os.OpenFile("score.json", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
}
func sortPlayers() {
	swap := true
	for swap {
		swap = false
		for i := 1; i < len(Players); i++ {
			for range Players {
				if Players[i-1].Score < Players[i].Score {
					Players[i], Players[i-1] = Players[i-1], Players[i]
					swap = true
				}
			}
		}
	}
}
func handleRequests(handlers Handlers) {
	http.HandleFunc("/", handlers.index)
	http.HandleFunc("/scoreboard", handlers.scoreBoard)

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func (h *Handlers) scoreBoard(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Players)
}
func (h *Handlers) index(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err == nil {
		createPlayer(reqBody)
	}
	if err := h.Tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 500)
	}
}

func main() {
	handlers := &Handlers{
		Tmpl: template.Must(template.ParseFiles("index.html")),
	}
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	handleRequests(*handlers)
}
