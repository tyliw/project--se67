package payment

import (
	"gorm.io/gorm"
	"project-se67/entity/food_service"
	"time"
)

type FoodServicePayment struct {
	gorm.Model
	PaymentDate 	time.Time 		`gorm:"not null"`
	Price 			float32			`gorm:"not null"`
	Status			string			`gorm:"not null"`
	PaymentMethod 	string 			`gorm:"not null"`
	
	// OrderID ทำหน้าที่เป็น FK
	OrderID 		uint
	Order   		*food_service.Order `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`

	// TripPaymentID ทำหน้าที่เป็น FK
	TripPaymentID 	uint
	TripPayment   	*TripPayment `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`
}