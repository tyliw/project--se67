package main

import (
	"net/http"
	"project-se67/config"
	"project-se67/controller/food_service" // เพิ่มการเรียกใช้งาน food_service controller
	"project-se67/controller/genders"
	"project-se67/controller/payment" // สำหรับการเรียกใช้งาน payment controller
	"project-se67/controller/users"
	"project-se67/middlewares"

	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	// เปิดการเชื่อมต่อฐานข้อมูล
	config.ConnectionDB()
	// สร้างฐานข้อมูล
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware()) // ใช้งาน CORS middleware

	// Auth Route
	r.POST("/signup", users.SignUp)
	r.POST("/signin", users.SignIn)

	// เส้นทางสำหรับการสมัครและลงชื่อเข้าใช้

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())

		// User Route

		router.PUT("/user/:id", users.Update)

		router.GET("/users", users.GetAll)
 
		router.GET("/user/:id", users.Get)
 
		router.DELETE("/user/:id", users.Delete)
		
		// เส้นทางการจัดการ payment
		router.GET("/foodservicepayments", payment.GetAllFoodServicePayments)
		router.GET("/foodservicepayment/:id", payment.GetFoodServicePayment)
		router.POST("/foodservicepayment", payment.CreateFoodServicePayment)
		router.PUT("/foodservicepayment/:id", payment.UpdateFoodServicePayment)
		router.DELETE("/foodservicepayment/:id", payment.DeleteFoodServicePayment)

		router.GET("/trippayments", payment.GetAllTripPayments)
		router.GET("/trippayment/:id", payment.GetTripPayment)
		router.POST("/trippayment", payment.CreateTripPayment)
		router.PUT("/trippayment/:id", payment.UpdateTripPayment)
		router.DELETE("/trippayment/:id", payment.DeleteTripPayment)

		// เส้นทางการจัดการ food_service
		router.GET("/foodcategories", food_service.GetAllFoodCategories) // รับข้อมูลทั้งหมดของ FoodCategory
		router.GET("/foodcategory/:id", food_service.GetFoodCategory)   // รับข้อมูลของ FoodCategory โดยใช้ ID
		router.POST("/foodcategory", food_service.CreateFoodCategory)  // สร้าง FoodCategory ใหม่
		router.PUT("/foodcategory/:id", food_service.UpdateFoodCategory) // อัปเดตข้อมูล FoodCategory
		router.DELETE("/foodcategory/:id", food_service.DeleteFoodCategory) // ลบ FoodCategory

		router.GET("/menus", food_service.GetAllMenus) // รับข้อมูลทั้งหมดของ Menu
		router.GET("/menu/:id", food_service.GetMenu)   // รับข้อมูลของ Menu โดยใช้ ID
		router.POST("/menu", food_service.CreateMenu)  // สร้าง Menu ใหม่
		router.PUT("/menu/:id", food_service.UpdateMenu) // อัปเดตข้อมูล Menu
		router.DELETE("/menu/:id", food_service.DeleteMenu) // ลบ Menu

		router.GET("/orders", food_service.GetAllOrders) // รับข้อมูลทั้งหมดของ Order
		router.GET("/order/:id", food_service.GetOrder)   // รับข้อมูลของ Order โดยใช้ ID
		router.POST("/order", food_service.CreateOrder)  // สร้าง Order ใหม่
		router.PUT("/order/:id", food_service.UpdateOrder) // อัปเดตข้อมูล Order
		router.DELETE("/order/:id", food_service.DeleteOrder) // ลบ Order

		router.GET("/orderdetails", food_service.GetAllOrderDetails) // รับข้อมูลทั้งหมดของ OrderDetail
		router.GET("/orderdetail/:id", food_service.GetOrderDetail) // รับข้อมูลของ OrderDetail โดยใช้ ID
		router.POST("/orderdetail", food_service.CreateOrderDetail) // สร้าง OrderDetail ใหม่
		router.PUT("/orderdetail/:id", food_service.UpdateOrderDetail) // อัปเดตข้อมูล OrderDetail
		router.DELETE("/orderdetail/:id", food_service.DeleteOrderDetail) // ลบ OrderDetail
	}

	r.GET("/genders", genders.GetAll)

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// เริ่มต้น server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
