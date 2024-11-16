package config

import (
	"fmt"
	// "project-se67/config"
	// "project-se67/config"
	"project-se67/entity"
	"time"

	// "gorm.io/gorm"
)

func SetupUserDatabase() {


	db.AutoMigrate(
 
		&entity.Users{},
 
		&entity.Genders{},
 
	)
 
 
	GenderMale := entity.Genders{Gender: "Male"}
 
	GenderFemale := entity.Genders{Gender: "Female"}
 
 
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
 
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})
 
 
	hashedPassword, _ := HashPassword("123")
 
	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
 
	User := &entity.Users{
 
		FirstName: "Software",
 
		LastName:  "Analysis",
 
		Email:     "sa@gmail.com",
 
		Age:       80,
 
		Password:  hashedPassword,
 
		BirthDay:  BirthDay,
 
		GenderID:  1,
 
		PhoneNumber: "0979989859",
 
	}
 
	db.FirstOrCreate(User, &entity.Users{
 
		Email: "sa@gmail.com",
 
	})
 
	fmt.Println("USER data has been added to the database.")
 }