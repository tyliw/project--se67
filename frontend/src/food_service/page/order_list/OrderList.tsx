// import { useEffect, useState } from "react";
// import { MenuInterface } from "../../interface/IMenu";
// import { GetMenu } from "../../service/https/MenuAPI";
// import { message } from "antd";
import { OrderDetailInterface } from "../../interface/IOrderDetail";
import { MdCancel } from "react-icons/md";
// import { MdFastfood } from "react-icons/md";
import FoodCart from "../../assets/food-cart.png";
import "./index.css";
import { useEffect } from "react";

interface OrderListProps {
  selectMenu: OrderDetailInterface[];
  setSelectMenu: React.Dispatch<React.SetStateAction<OrderDetailInterface[]>>;
}

const OrderList: React.FC<OrderListProps> = ({ selectMenu, setSelectMenu }) => {
  const handleRemoveItem = (menuID: number) => {
    setSelectMenu((prev) => prev.filter((item) => item.MenuID !== menuID));
  };

  const handleQuantityChange = (menuID: number, action: "increase" | "decrease") => {
    setSelectMenu((prev) =>
      prev.map((item) => {
        if (item.MenuID === menuID) {
          const newQuantity = action === "increase" ? item.Quantity + 1 : Math.max(item.Quantity - 1, 1);
          return { ...item, Quantity: newQuantity};
        }
        return item;
      })
    );
  };

  useEffect(() => {
  }, [selectMenu]);

  return (
    <div className="my-order">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontSize: "30px" }}> My Order</h1>
        <section className="order-detail">
          {selectMenu.length > 0 ? (
            selectMenu.map((item) => (
              <div className="order-item" key={item.MenuID}>
                <MdCancel
                  className="cancel-icon"
                  color="ff0000"
                  size={25}
                  onClick={() => handleRemoveItem(item.MenuID)}
                  style={{ cursor: "pointer" }}
                />
                <div className="menu-detail">
                  <h1 className="menu-name" style={{ margin: 0 }}>
                    {item.Menu?.MenuName}
                  </h1>
                  <p className="description" style={{ margin: 0, opacity: "0.7" }}>
                    {item.Menu?.Description}
                  </p>
                  <h1 className="amount" style={{ margin: 0 }}>฿ {item.Amount.toFixed(2)}</h1>
                </div>
                <div className="quantity-control">
                  <button
                    className="minus-button"
                    onClick={() => handleQuantityChange(item.MenuID, "decrease")}
                  >
                    -
                  </button>
                  <input
                    className="quantity"
                    name="quantity"
                    value={item.Quantity}
                    readOnly
                  />
                  <button
                    className="plus-button"
                    onClick={() => handleQuantityChange(item.MenuID, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              display: "flex",
              justifyContent: "center",
              width: "340px",
              height: "80px",
              padding: "10px",
              alignItems: "center",
              opacity: "0.7"
            }}>
              No items in the order.
            </div>
          )}
        </section>
      </div>

          
      <section className="summary">
        <img
          src={FoodCart}
          style={{
            width: "100px",
            objectFit: "cover",
          }}
        />
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "50px",
            gap: "20px",
            padding: "10px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#133E87",
          }}>
            <h1 style={{ margin: 0 }}>Total</h1>
            <h1 style={{ margin: 0 }}>฿ {selectMenu.reduce((sum, item) => sum + item.Amount * item.Quantity, 0).toFixed(2)}</h1>
          </div>
          <button className="confirm-order-button">Confirm Order</button>
        </div>
      </section>
    </div>
  );
};

export default OrderList;
