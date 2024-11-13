package food_service

import (
	"time"
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	OrderDate 		time.Time
	TotalAmount     float32
}