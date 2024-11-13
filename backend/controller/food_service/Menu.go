package food_service

import (
	"net/http"
	"project-se67/config"
	"project-se67/entity/food_service"

	"github.com/gin-gonic/gin"
)

func GetAllMenus(c *gin.Context) {
	var menus []food_service.Menu
	db := config.DB()

	if err := db.Preload("FoodCategory").Find(&menus).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, menus)
}

func GetMenu(c *gin.Context) {
	ID := c.Param("id")
	var menu food_service.Menu
	db := config.DB()

	if err := db.Preload("FoodCategory").First(&menu, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, menu)
}

func CreateMenu(c *gin.Context) {
	var menu food_service.Menu
	db := config.DB()

	// Bind JSON request body to menu struct
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// Save the new menu to the database
	if err := db.Create(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Menu"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Menu created successfully", "data": menu})
}


func UpdateMenu(c *gin.Context) {
	var menu food_service.Menu
	db := config.DB()

	if err := db.First(&menu, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db.Save(&menu)
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	if tx := db.Delete(&food_service.Menu{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
