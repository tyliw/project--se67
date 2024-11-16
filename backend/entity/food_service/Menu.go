package food_service

import (
	"gorm.io/gorm"
 )
 
 type Menu struct {
	gorm.Model
	MenuName 	string
	Price 		float32
	Description string
	ImageMenu   string 	`gorm:"type:longtext"`

	// FoodCategoryID ทำหน้าที่เป็น FK
	FoodCategoryID 		uint
	FoodCategory    	*FoodCategory  `gorm:"foreignKey: FoodCategoryID"`

	// 1 menu มีได้หลาย order
	OrderDetails []OrderDetail `gorm:"foreignKey:MenuID;constraint:OnDelete:CASCADE;"`
 }