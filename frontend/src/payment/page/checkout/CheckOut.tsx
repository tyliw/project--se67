import { useState, useEffect } from "react";
import { OrderDetailInterface } from "../../../food_service/interface/IOrderDetail";
import { Link, useLocation } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import PaymentMethod from "../payment_method/PaymentMethod";
import EmptyCartLogo from "../../assets/shopping.png";
import "./index.css";

const CheckOut: React.FC = () => {
  const location = useLocation();
  const { orderDetail: initialOrderDetail = [] } = location.state || {};
  const [orderDetail, setOrderDetail] = useState<OrderDetailInterface[]>(initialOrderDetail);
  const [subtotal, setSubtotal] = useState<number>(0);

  // คำนวณ subtotal ใหม่ทุกครั้งที่ orderDetail เปลี่ยนแปลง
  useEffect(() => {
    const newSubtotal = orderDetail.reduce((total, item) => total + item.Quantity * (item.Menu?.Price || 0), 0);
    setSubtotal(newSubtotal);
  }, [orderDetail]);

  const handleRemoveItem = (menuID: number) => {
    setOrderDetail((prev) => prev.filter((item) => item.MenuID !== menuID));
  };

  const handleQuantityChange = (menuID: number, action: "increase" | "decrease") => {
    setOrderDetail((prev) =>
      prev.map((item) => {
        if (item.MenuID === menuID) {
          const newQuantity = action === "increase" ? item.Quantity + 1 : Math.max(item.Quantity - 1, 1);
          return { ...item, Quantity: newQuantity }; // ไม่แก้ไข Amount
        }
        return item;
      })
    );
  };

  // console.log(orderDetail)

  return (
    <>
      <div className="checkout-container">
        <div className="checkout-card">
          <div className="checkout-order-detail">
              <h1>Order Detail</h1>
            <hr />
            <section className="checkout-order-summary-content">
              {orderDetail.length > 0 ? (
                orderDetail.map((item) => (
                  <>
                    <div className="checkout-order-list" key={item.ID}>
                      <img src={item.Menu?.ImageMenu} alt={item.Menu?.MenuName} />
                      <div className="checkout-menu-detail">
                        <h1>{item.Menu?.MenuName}</h1>
                        <p>{item.Menu?.Description}</p>
                      </div>

                      <div className="checkout-quantity-control">
                        <button
                          className="checkout-minus-button"
                          onClick={() => handleQuantityChange(item.MenuID, "decrease")}
                        >
                          -
                        </button>
                        <input
                          className="checkout-quantity"
                          name="checkout-quantity"
                          value={item.Quantity}
                          readOnly
                        />
                        <button
                          className="checkout-plus-button"
                          onClick={() => handleQuantityChange(item.MenuID, "increase")}
                        >
                          +
                        </button>
                      </div>

                      <h1 className="checkout-menu-amount">฿ {item.Amount}</h1>

                      <MdCancel
                        className="cancel-icon"
                        color="dfdfe3"
                        size={25}
                        onClick={() => handleRemoveItem(item.MenuID)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    {/* <hr /> */}
                  </>
                ))
              ) : (
                <div className="no-order">
                  <img src={EmptyCartLogo} alt="empty cart" />
                  <Link
                    to="/login/menu"
                    style={{ textDecoration: "none", color: "gray" }}
                  >
                    <div className="message">
                      <p style={{ fontSize: "14px" }}>your order is empty</p>
                      <button>Order Now</button>
                    </div>
                  </Link>
                </div>
              )}
            </section>

            <Link to="/login/menu" state={{ orderDetail: orderDetail }} style={{textDecoration:"none"}}>
              <div className="back-to-shop">
                <div className="arrow"></div>
                <span className="text-muted">Back to shop</span>
              </div>
            </Link>
          </div>

          <div className="payment-method">
            <PaymentMethod subtotal={subtotal} orderDetail={orderDetail} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
