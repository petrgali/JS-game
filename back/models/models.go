package models

import (
	"encoding/json"
)

/*Player - api json container*/
type Player struct {
	Rank      int    `json:"rank"`
	Name      string `json:"name"`
	Destroyed int    `json:"destroyed"`
	Shots     int    `json:"shotsFired"`
	Minutes   int    `json:"minutes"`
	Seconds   int    `json:"seconds"`
	Accuracy  int    `json:"accuracy"`
	Score     int    `json:"score"`
}

/*Players - consist of player api data*/
// var Players []Player

func ValidateStat(reqBody []byte) (string, Player) {
	var player Player
	if err := json.Unmarshal(reqBody, &player); err != nil {
		return err.Error(), player
	}
	if !validData(player) {
		return "invalid data", player
	}
	return "", player
}
func validData(player Player) bool {
	if player.Seconds > 0 && player.Minutes >= 0 && len(player.Name) <= 8 {
		return true
	}
	return false
}

// func ReadHistory() (string, bool) {
// 	body, err := ioutil.ReadFile("./storage/stat.json")
// 	if err == nil {
// 		if err = json.Unmarshal(body, &Players); err != nil {
// 			return err.Error(), false
// 		}
// 	}
// 	return "", true
// }
// func sortPlayers() {
// 	swap := true
// 	for swap {
// 		swap = false
// 		for i := 1; i < len(Players); i++ {
// 			for range Players {
// 				if Players[i-1].Score < Players[i].Score {
// 					Players[i], Players[i-1] = Players[i-1], Players[i]
// 					swap = true
// 				}
// 			}
// 		}
// 	}
// 	for idx := range Players {
// 		Players[idx].Rank = idx + 1
// 	}
// }
// func saveResults() (string, bool) {
// 	stat, err := json.MarshalIndent(Players, "", "")
// 	if err != nil {
// 		return err.Error(), false
// 	}
// 	if err = ioutil.WriteFile("./storage/stat.json", stat, 0644); err != nil {
// 		return err.Error(), false
// 	}
// 	return "", true
// }
