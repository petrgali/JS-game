package database

import (
	"database/sql"
	"fmt"
	"make-your-game-back/models"

	_ "github.com/lib/pq"
)

type DBconn struct {
	Conn *sql.DB
}

var DB = &DBconn{}

func Init(url string) error {
	conn, err := sql.Open("postgres", url)
	if err != nil {
		return err
	} else {
		DB.Conn = conn
	}
	DB.CreateDB()
	DB.Conn.SetMaxOpenConns(20)
	DB.Conn.SetMaxIdleConns(20)
	return DB.Conn.Ping()
}
func (db *DBconn) CreateDB() {
	_, err := db.Conn.Exec("CREATE TABLE IF NOT EXISTS stat (name VARCHAR(10) NOT NULL, destroyed INT, shots INT, minutes INT, seconds INT, accuracy INT, score INT)")
	if err != nil {
		fmt.Println(err.Error())
	}
}
func (db *DBconn) CreateStat(player models.Player) (err error) {
	if _, err = db.Conn.Exec(
		"INSERT INTO stat (name,destroyed,shots,minutes,seconds,accuracy,score) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		player.Name,
		player.Destroyed,
		player.Shots,
		player.Minutes,
		player.Seconds,
		player.Accuracy,
		player.Score,
	); err != nil {
		return
	}
	return nil
}
func (db *DBconn) ReadStat() ([]models.Player, error) {
	players := []models.Player{}
	rows, err := db.Conn.Query("SELECT name, destroyed, shots, minutes, seconds, accuracy, score FROM stat ORDER BY score DESC")
	if err != nil {
		return players, err
	}
	defer rows.Close()
	idx := 1
	for rows.Next() {
		player := &models.Player{}
		if err := rows.Scan(&player.Name, &player.Destroyed, &player.Shots, &player.Minutes, &player.Seconds, &player.Accuracy, &player.Score); err != nil {
			return players, nil
		}
		player.Rank = idx
		idx++
		players = append(players, *player)
	}
	return players, nil
}
