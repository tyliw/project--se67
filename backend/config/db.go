package config

import (
	// "project-se67/con/food_service"
	"fmt"
	"project-se67/config/setup"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
   return db
}


func ConnectionDB() {
   database, err := gorm.Open(sqlite.Open("project-se67.db?cache=shared"), &gorm.Config{})
   if err != nil {
       panic("failed to connect database")
   }
   fmt.Println("connected database")
   db = database
}


func SetupDatabase() {
   setup.SetupFoodServiceDatabase(db)
   setup.SetupPaymentDatabase(db)
   SetupUserDatabase()


	fmt.Println("Sample data has been added to the database.")
}