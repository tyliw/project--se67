import { OrderDetailInterface } from "../../interface/IOrderDetail";
import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};


async function GetOrderDetail() {
  return await axios
    .get(`${apiUrl}/orderdetails`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrderDetailById(id: string) {
  return await axios
    .get(`${apiUrl}/orderdetail/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateOrderDetail(data: OrderDetailInterface) {
  return await axios
    .post(`${apiUrl}/orderdetail`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateOrderDetailById(id: string, data: OrderDetailInterface) {
  return await axios
    .put(`${apiUrl}/orderdetail/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteOrderDetailById(id: string) {
  return await axios
    .delete(`${apiUrl}/orderdetail/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetOrderDetail,
  GetOrderDetailById,
  CreateOrderDetail,
  UpdateOrderDetailById,
  DeleteOrderDetailById,
};
