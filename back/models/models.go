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
