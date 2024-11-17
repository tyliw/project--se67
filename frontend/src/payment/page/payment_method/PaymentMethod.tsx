import { useNavigate } from "react-router-dom";
import { OrderInterface } from "../../../food_service/interface/IOrder";
import { OrderDetailInterface } from "../../../food_service/interface/IOrderDetail";
import { FoodServicePaymentInterface } from "../../interface/IFoodServicePayment";

import { CreateOrder } from "../../../food_service/service/https/OrderAPI";
import { CreateOrderDetail } from "../../../food_service/service/https/OrderDetailAPI";
import { CreateFoodServicePayment } from "../../service/https/FoodServicePaymentAPI";

import PromptPayLogo from "../../assets/PromptPay.png";
import CreditCard from "../../assets/Credit-DebitCard.png";

import { message } from "antd";
import "./index.css";
// import { CreateOrderDetail } from "../../../food_service/service/https/OrderDetailAPI";

const PaymentMethod: React.FC<{ subtotal: number; orderDetail: OrderDetailInterface[] }> = ({ subtotal, orderDetail }) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
  const vatRate = 0.07; // 7% VAT
  const numericSubtotal = Number(subtotal) || 0; // แปลงเป็นตัวเลข
  const vat = numericSubtotal * vatRate;
  const total = numericSubtotal + vat;

  const onConfirmPayment = async (numericSubtotal: number, totalAmount: number, orderDetail: OrderDetailInterface[]) => {
    // รอผลลัพธ์จาก funcCreateOrder
    const orderID = await funcCreateOrder(numericSubtotal, orderDetail);

    if (!orderID) {
        messageApi.open({
            type: "error",
            content: "Failed to create order.",
        });
        return;
    }

    const foodServicePaymentData: FoodServicePaymentInterface = {
        PaymentDate: new Date(),
        Price: totalAmount,
        Status: "pending",
        PaymentMethod: "OR Code",
        OrderID: orderID, // ใช้ผลลัพธ์ที่ได้จาก funcCreateOrder
        TripPaymentID: 1, // ใช้ค่าที่กำหนดไว้
    };

    const res = await CreateFoodServicePayment(foodServicePaymentData);

    if (res.status === 201) {
        messageApi.open({
            type: "success",
            content: res.data.message,
        });
    } else {
        messageApi.open({
            type: "error",
            content: res.data.error,
        });
    }
};

  
  const funcCreateOrder= async (totalAmount: number, orderDetail: OrderDetailInterface[]) => {
    const orderData: OrderInterface = {
        OrderDate: new Date(),
        TotalAmount: totalAmount,
    };

    const res = await CreateOrder(orderData);

    if (res.status == 201) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });

        funcCreateOrderDetail(res.data.data.ID, orderDetail)

      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }

      return res.data.data.ID
  };

  const funcCreateOrderDetail = async (orderID: number, orderDetail: OrderDetailInterface[]) => {
    const orderDetailPromises = orderDetail.map((item) => {
        const orderDetailData: OrderDetailInterface = {
            Quantity: item.Quantity,
            Amount: item.Amount * item.Quantity,
            MenuID: item.MenuID,
            OrderID: orderID,
        };

        // เปลี่ยนจาก CreateOrder เป็น CreateOrderDetail
        return CreateOrderDetail(orderDetailData);
    });

    // ดำเนินการ Promise.all เพื่อสร้างออเดอร์ทั้งหมด
    const results = await Promise.all(orderDetailPromises);

    if (results.every((res) => res.status === 201)) {
        messageApi.open({
            type: "success",
            content: "All order details created successfully!",
        });

        setTimeout(() => {
            navigate("/login/menu");
        }, 2000);
    } else {
        messageApi.open({
            type: "error",
            content: "Failed to create some order details.",
        });
    }
};

  return (
    <>
        {contextHolder}
      <div className="payment-method-container">
        <div className="select-method">
          <header>
            <h1>Select payment method</h1>
          </header>
          <hr />
          <div className="method">
            <button className="prompt-pay">
              <img src={PromptPayLogo} alt="" />
              <h1>QR PromptPay</h1>
            </button>

            <button className="credit-card">
              <img src={CreditCard} alt="" />
              <h1>Credit/Debit Card</h1>
            </button>
          </div>
        </div>

        <div className="order-summary">
          <header>
            <h1>Order Summary</h1>
          </header>
          <hr />
          <div className="order-summary-content">
            <div className="order-summary-detail">
              <div className="order-summary-subtotal">
                <p style={{ width: "80px" }}>Subtotal</p>
                <p style={{ width: "100px", display:"flex", justifyContent:"end"}}>฿ {numericSubtotal.toFixed(2)}</p>
              </div>
              <div className="order-summary-vat">
                <p style={{ width: "80px" }}>VAT (7%)</p>
                <p style={{ width: "100px", display:"flex", justifyContent:"end"}}>฿ {vat.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="order-summary-total">
            <h2 style={{ width: "80px" }}>Total</h2>
            <h2 style={{ width: "100px", display:"flex", justifyContent:"end"}}>฿ {total.toFixed(2)}</h2>
          </div>
        </div>
        <button className="checkout-button" onClick={() => onConfirmPayment(numericSubtotal, total, orderDetail)}>
            Confirm Payment 
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
