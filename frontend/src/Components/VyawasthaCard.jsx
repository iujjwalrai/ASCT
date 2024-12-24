import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const VyawasthaCard = ({ vyawastha }) => {
  const { name, description, amount, isCompleted, _id } = vyawastha;
  const advo = useSelector((state) => state.user.userDetails);

  const [donationStatus, setDonationStatus] = useState({
    paid: false,
    transactionId: null,
  });

  const fetchDonationStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/checkVyawastha`,
        {
          params: { userId: advo._id, vyawasthaId: _id },
          withCredentials: true,
        }
      );
      setDonationStatus({
        paid: response.data.donated,
        transactionId: response.data.transactionId,
      });
    } catch (error) {
      console.error('Error checking donation status:', error);
    }
  };

  useEffect(() => {
    fetchDonationStatus();
  }, [advo._id, _id]);

  const handleVyawasthaPayment = async () => {
    if (!window.Razorpay) {
      toast.error('Razorpay is not loaded!');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/paymentPortal/paymentCapture/asct`,
        JSON.stringify({ amount: Number(amount) }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const order = response.data.order;
      const options = {
        key: process.env.REACT_APP_RAZOR_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'ASCT - Vyawastha Payment',
        description: 'Payment for Vyawastha',
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/paymentPortal/paymentCapture/verifyVyawastha`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                vyawasthaId: _id,
                userId: advo._id,
                amount: Number(amount) * 100,
              },
              { headers: { 'Content-Type': 'application/json' } }
            );

            if (verifyResponse.data.success) {
              toast.success('Donation successful!');
              setDonationStatus({
                paid: true,
                transactionId: verifyResponse.data.transactionId,
              });
            } else {
              toast.error('Payment verification failed.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Error verifying your payment.');
          }
        },
        prefill: {
          name: advo.name,
          email: advo.email,
          contact: advo.contact,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment process:', error);
      toast.error('Payment initiation failed.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      <h1 className="text-red-700 font-bold text-xl mb-2">{name}</h1>
      <p className="text-blue-600 text-md text-center mb-2">{description}</p>
      <p className="text-orange-600 font-semibold text-lg">Amount: ₹{amount}</p>
      <p className={`text-lg font-bold mt-2 ${isCompleted ? 'text-green-600' : 'text-red-600'}`}>
        {isCompleted ? 'Donation is now over' : 'Donation in progress'}
      </p>
      {donationStatus.paid ? (
        <div className="mt-2 text-center">
          <p className="text-green-600 font-semibold">You have already donated!</p>
          <p className="text-gray-500 text-sm">Transaction ID: {donationStatus.transactionId}</p>
        </div>
      ) : (
        !isCompleted && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleVyawasthaPayment}
          >
            Donate Now
          </button>
        )
      )}
    </div>
  );
};

export default VyawasthaCard;
