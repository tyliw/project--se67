package setup

import (
	"fmt"
	"project-se67/entity/food_service"
	"time"
	"gorm.io/gorm"
)

func SetupFoodServiceDatabase(db *gorm.DB) {
	// Auto-migrate tables
	db.AutoMigrate(
		&food_service.FoodCategory{},
		&food_service.Menu{},
		&food_service.Order{},
		&food_service.OrderDetail{},
	)

	// Create sample FoodCategories
	foodCategory1 := food_service.FoodCategory{Name: "Beverages"}
	foodCategory2 := food_service.FoodCategory{Name: "Main Dishes"}
	db.Create(&foodCategory1)
	db.Create(&foodCategory2)

	// Create sample Menus
	menu1 := food_service.Menu{
		MenuList:       "Coffee",
		Price:          3.5,
		Description:    "Hot brewed coffee",
		ImageMenu:      "image_url_1",
		FoodCategoryID: foodCategory1.ID,
	}
	menu2 := food_service.Menu{
		MenuList:       "Pasta",
		Price:          12.0,
		Description:    "Spaghetti with tomato sauce",
		ImageMenu:      "image_url_2",
		FoodCategoryID: foodCategory2.ID,
	}
	db.Create(&menu1)
	db.Create(&menu2)

	// Create sample Orders
	order1 := food_service.Order{
		OrderDate:   time.Now(),
		TotalAmount: 15.5,
	}
	db.Create(&order1)

	// Create sample OrderDetails
	orderDetail1 := food_service.OrderDetail{
		Quantity:  1,
		Amount:    menu1.Price,
		MenuID:    menu1.ID,
		OrderID:   order1.ID,
	}
	orderDetail2 := food_service.OrderDetail{
		Quantity:  2,
		Amount:    menu2.Price * 2,
		MenuID:    menu2.ID,
		OrderID:   order1.ID,
	}
	db.Create(&orderDetail1)
	db.Create(&orderDetail2)

	fmt.Println("FOODSERVICE data has been added to the database.")
}
