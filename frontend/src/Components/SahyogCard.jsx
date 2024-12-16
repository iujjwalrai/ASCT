import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice'
import axios from 'axios';
const SahyogCard = ({ sahyog }) => {

  const dispatch = useDispatch()

  const { user, amount, isCompleted, _id } = sahyog;


  const advo = useSelector((state) => state.user.userDetails);

  const doneSahyogs = advo?.SahyogList || [];

  console.log("SahyogList:", doneSahyogs); 
  console.log("Sahyog ID:", _id); 

  const doneSahyog = doneSahyogs.find(
    (doneSahyog) => doneSahyog?.sahyog?.toString() === _id?.toString()
  );

  const paid = !!doneSahyog; 
  const transId = doneSahyog?.transactionId;
  const handleSahyogPayment = async () => {
    if (!window.Razorpay) {
      console.error("Razorpay is not loaded!");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/paymentPortal/paymentCapture/sahyog`,
        JSON.stringify({ amount: Number(amount)}), {
          headers: {
            "Content-Type": 'application/json',
          },
          withCredentials: true,
        }
      );
  
      const order = response.data.order;  // Access the response data directly
      console.log(order);
      const options = {
        key: process.env.REACT_APP_RAZOR_KEY_ID,  // Replace with your Razorpay Key ID
        amount: order.amount * 100,  // Convert amount to paise
        currency: order.currency,
        name: "ASCT - Sahyog Payment",
        description: "Test Transaction",
        order_id: order.id,  // Razorpay order ID
        handler: async function (response) {
          try {
            console.log("Options sent to Razorpay:", options);
            // Send payment details to the server for verification
            const verifyResponse = await axios.post(
              `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/paymentPortal/paymentCapture/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                sahyogId: _id,  // Sahyog ID of the donation
                userId: advo._id,  // User ID of the donor
                amount: Number(amount)*100,  // Donation amount
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (verifyResponse.data.success) {
              alert('Donation successful!');
              dispatch(setUser(verifyResponse.data.user))

            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("There was an error verifying your payment.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
      };
  
      const razorpay = new window.Razorpay(options);  // Ensure Razorpay is loaded globally
      razorpay.open();
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };  


  return (
    <div className='bg-white bg-opacity-60 px-8 py-5 rounded-lg min-w-[320px]'>
      <h1 className='text-red-800 text-2xl font-bold'>{user.name}</h1>
      <h1 className='text-blue-800 text-xl font-semibold mt-1'>Reg No: {user.RegNo}</h1>
      <h1 className='text-orange-500 text-xl font-semibold mt-1'>COP No: {user.COPNo}</h1>
      <h1 className='text-green-500 text-xl font-semibold mt-1'>Amount: ₹{amount}</h1>
      <h1 className='text-red-800 text-2xl font-bold'>
        {isCompleted ? `Donation is now over` : `Donation is in progress`}
      </h1>
      {paid ? (
        <div className='text-green-600 font-semibold'>
          You have already donated.
          <div className='text-gray-600 text-sm'>Transaction ID: {transId}</div>
        </div>
      ) : (!isCompleted&&
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={handleSahyogPayment}>
          Click here to donate the money
        </button>
      )}
    </div>
  );
};

export default SahyogCard;
