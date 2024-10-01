
import { notification } from "antd";
import { api } from "../api/api";
import { useState } from "react";


const token = localStorage.getItem("token");
const showErrorNotification = (message) => {
  notification.error({
    message: "Error",
    description: message,
    placement: "topRight",
  });
};
const showSuccessNotification = (message) => {
  notification.success({
    message: "Success",
    description: message,
    placement: "topRight",
  });
};

const usePayment = () =>{
const[customerPayments,setCustomersPayment] = useState([])

const getPaymentsByCustomer = async(customerId)=>{
 try{
    const payments = await api.get(`/api/payment/getPaymentsByCustomer/${customerId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    console.log(payments);
    
    setCustomersPayment(
        payments.data.reverse().map((item, index) => {
          return {
            ...item,
            index: index + 1,
          };
        })
      );
 }catch(error){
        console.error(`Error fetching data, ${error.message}`)
 }
}

const getAllPayments = async()=>{
  console.log(token);
  
 try{
    const payments = await api.get(`/api/payment/getAllPayments`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    )
    setCustomersPayment(
        payments.data.reverse().map((item, index) => {
          return {
            ...item,
            index: index + 1,
          };
        })
      );
 }catch(error){
        console.error(`Error fetching data, ${error.message}`)
 }
}

return {
    getPaymentsByCustomer,
    customerPayments,
    getAllPayments
}
}
export default usePayment;