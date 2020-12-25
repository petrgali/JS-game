package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type DBconn struct {
	Conn *sql.DB
}

func Init(url string) error {
	db := &DBconn{}
	conn, err := sql.Open("postgres", url)
	if err != nil {
		log.Printf("Database connection failed. Reason: %s", err.Error())
	} else {
		db.Conn = conn
	}
	db.Conn.SetMaxOpenConns(20)
	db.Conn.SetMaxIdleConns(20)
	return db.Conn.Ping()
}
func (db *DBconn) Create() {
	_, err := db.Conn.Exec("CREATE TABLE IF NOT EXISTS players(player_id SERIAL PRIMARY KEY, rank INTEGER NOT NULL)")
	if err != nil {
		fmt.Println(err.Error())
	}
}
