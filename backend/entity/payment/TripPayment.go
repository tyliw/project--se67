package payment

import (
	"gorm.io/gorm"
	"project-se67/entity/food_service"
	"time"
)

type TripPayment struct {
	gorm.Model
	PaymentDate 	time.Time 		`gorm:"not null"`
	TotalPrice 			float32			`gorm:"not null"`
	Status			string			`gorm:"not null"`
	PaymentMethod 	string 			`gorm:"not null"`
	
	// OrderID ทำหน้าที่เป็น FK
	OrderID 		uint
	Order   		*food_service.Order `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`

	// TripPaymentID ทำหน้าที่เป็น FK
	TripPaymentID 	uint
	TripPayment   	*TripPayment `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`
}