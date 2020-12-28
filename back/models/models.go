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
	if !valid(player) {
		return "invalid data format", player
	}
	return "", player
}
func valid(player Player) bool {
	if player.Seconds > 0 && player.Seconds <= 60 &&
		player.Minutes >= 0 &&
		player.Destroyed >= 0 &&
		player.Shots > 0 &&
		player.Accuracy >= 0 && player.Accuracy <= 100 &&
		player.Score >= 0 &&
		len(player.Name) <= 8 {
		return true
	}
	return false
}
