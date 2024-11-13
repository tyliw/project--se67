package setup

import (
	"fmt"
	"project-se67/entity/food_service"
	"project-se67/entity/payment"
	"time"

	"gorm.io/gorm"
)

func SetupPaymentDatabase(db *gorm.DB) {
	// Auto-migrate tables
	db.AutoMigrate(
		&payment.TripPayment{},
		&payment.FoodServicePayment{},
	)

	// Create sample TripPayment
	tripPayment := payment.TripPayment{
		PaymentDate:   time.Now(),
		TotalPrice:    100.0,
		Status:        "Completed",
		PaymentMethod: "Credit Card",
	}
	db.Create(&tripPayment)

	// Create sample Order in Food Service
	order := food_service.Order{
		OrderDate:   time.Now(),
		TotalAmount: 50.0,
	}
	db.Create(&order)

	// Create sample FoodServicePayment linked to Order and TripPayment
	foodServicePayment := payment.FoodServicePayment{
		PaymentDate:   time.Now(),
		Price:         order.TotalAmount,
		Status:        "Paid",
		PaymentMethod: "Credit Card",
		OrderID:       order.ID,
		TripPaymentID: tripPayment.ID,
	}
	db.Create(&foodServicePayment)

	fmt.Println("PAYMENT data has been added to the database.")
}
