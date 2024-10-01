
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
    const payments = api.get(`/api/payment/getPaymentsByCustomer/${customerId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    console.log(payments);
    
    setCustomersPayment(
      payments
        // payments.reverse().map((item, index) => {
        //   return {
        //     ...item,
        //     index: index + 1,
        //   };
        // })
      );
 }catch(error){
        console.error(`Error fetching data, ${error.message}`)
 }
}

return {
    getPaymentsByCustomer,
    customerPayments,
}
}
export default usePayment;