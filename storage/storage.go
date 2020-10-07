package storage

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

/*Player - api json container*/
type Player struct {
	Name      string `json:"name"`
	Destroyed int    `json:"destroyed"`
	Shots     int    `json:"shotsFired"`
	Minutes   int    `json:"munites"`
	Seconds   int    `json:"seconds"`
	Accuracy  int    `json:"accuracy"`
	Score     int    `json:"score"`
}

/*Players - consist of player api data*/
var Players []Player

func CreatePlayer(reqBody []byte) {
	var player Player
	json.Unmarshal(reqBody, &player)
	if player.Seconds > 0 {
		Players = append(Players, player)
		sortPlayers()
		saveResults()
	}
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
func ReadHistory() {
	body, err := ioutil.ReadFile("stat.json")
	if err == nil {
		if err = json.Unmarshal(body, &Players); err != nil {
			fmt.Println(err)
		}
	}
}
func saveResults() {
	stat, err := json.MarshalIndent(Players, "", "")
	if err != nil {
		log.Fatal(err)
	}
	if err = ioutil.WriteFile("stat.json", stat, 0644); err != nil {
		log.Fatal(err)
	}
}