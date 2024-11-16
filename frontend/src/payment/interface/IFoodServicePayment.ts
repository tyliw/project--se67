import { OrderInterface } from "../../food_service/interface/IOrder";

export interface FoodServicePaymentInterface {
  ID?: number;
  PaymentDate?: string;
  Price?: number;
  Status?: string;
  PaymentMethod?: string;
  OrderID?: number;
  Order: OrderInterface;
  TripPaymentID?: number;
  TripPayment: OrderInterface;
}
