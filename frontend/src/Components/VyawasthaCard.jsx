import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const VyawasthaCard = ({ vyawastha }) => {
  const { name, description, amount, isCompleted, _id } = vyawastha;
  const advo = useSelector((state) => state.user.userDetails);

  const [donationStatus, setDonationStatus] = useState({
    paid: false,
    transactionId: null,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
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
        toast.error("Error checking donation status");
      }
    };

    fetchDonationStatus();
  }, [advo._id, _id]);

  const handlePayment = async () => {
    if (!advo || !advo._id) {
      toast.error("Please login to make a payment");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/paymentPortal/paymentCapture/createVyawasthaOrder`,
        {
          amount: amount,
          vyawasthaId: _id,
          userId: advo._id,
        },
        {
          withCredentials: true,
        }
      );

      if (!orderResponse.data.success) {
        toast.error("Failed to create payment order");
        setIsProcessing(false);
        return;
      }

      const order = orderResponse.data.order;
      const razorpayKey = orderResponse.data.key;

      if (!razorpayKey) {
        toast.error("Payment configuration missing. Please contact support.");
        setIsProcessing(false);
        return;
      }

      // Initialize Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "Advocate Self Care Samiti",
        description: `Payment for ${name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/paymentPortal/paymentCapture/verifyVyawastha`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                vyawasthaId: _id,
                userId: advo._id,
                amount: amount,
              },
              {
                withCredentials: true,
              }
            );

            if (verifyResponse.data.success) {
              toast.success("Payment successful!");
              setDonationStatus({
                paid: true,
                transactionId: verifyResponse.data.transactionId,
              });
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: advo.name || "",
          email: advo.email || "",
          contact: advo.mobile || "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl px-3 py-2 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Header Section */}
      <div className="text-center mb-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
          {name}
        </h1>
        
        <p className="text-gray-600 text-base leading-relaxed mb-4 max-w-md mx-auto">
          {description}
        </p>
        
        <div className="inline-flex items-center bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
          ₹{amount}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
          isCompleted 
            ? 'bg-red-100 text-red-700 border border-red-200' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isCompleted ? 'bg-red-500' : 'bg-green-500'
          }`}></div>
          {isCompleted ? 'Donation Closed' : 'Accepting Donations'}
        </div>
      </div>


      {/* Donation Status or Upload Section */}
      {donationStatus.paid ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Donation Complete!</h3>
          <p className="text-green-700 mb-3">Thank you for your contribution</p>
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Transaction ID:</p>
            <p className="font-mono text-sm font-semibold text-gray-800">{donationStatus.transactionId}</p>
          </div>
        </div>
      ) : (
        !isCompleted && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Make Payment</h3>
              <p className="text-gray-600 text-sm mb-4">Complete your donation using secure Razorpay payment</p>
            </div>
            
            <button
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <span>Pay ₹{amount}</span>
                </>
              )}
            </button>
          </div>
        )
      )}
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default VyawasthaCard;