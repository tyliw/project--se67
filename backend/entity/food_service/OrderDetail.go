package food_service

import (
	"time"
	"gorm.io/gorm"
)

type OrderDetail struct {
	gorm.Model
	OrderDate 	time.Time
	Quantity    int
	Amount     	float32

	// MenuID ทำหน้าที่เป็น FK
	MenuID 		uint
	Menu   		*Menu `gorm:"foreignKey:MenuID;constraint:OnDelete:CASCADE;"`

	// OrderID ทำหน้าที่เป็น FK
	OrderID 	uint
	Order   	*Order `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`
}