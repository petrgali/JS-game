package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

type Player struct {
	Name      string `json:"name"`
	Destroyed int    `json:"destroyed"`
	Shots     int    `json:"shotsFired"`
	// Time      string `json:"time"`
	Minutes  int
	Seconds  int
	Accuracy string `json:"accuracy"`
	Score    int    `json:"score"`
}

var Players []Player

func handleRequests() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/scoreboard", scoreHandler)

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func scoreHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Players)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("./index.html")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err == nil {
		createPlayer(reqBody)
	}
	t.Execute(w, nil)
}
func createPlayer(reqBody []byte) {
	var player Player
	json.Unmarshal(reqBody, &player)
	if player.Seconds > 0 {
		Players = append(Players, player)
		fmt.Println(Players)
	}
}

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	handleRequests()
}
