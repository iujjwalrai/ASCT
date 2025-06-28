import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const VyawasthaCard = ({ vyawastha }) => {
  const { name, description, amount, isCompleted, _id } = vyawastha;
  const advo = useSelector((state) => state.user.userDetails);

  const [donationStatus, setDonationStatus] = useState({
    paid: false,
    transactionId: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("No file uploaded");
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(`Selected file: ${file.name}`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", advo._id);
    formData.append("vyawasthaId", _id);
    formData.append("amount", amount);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/uploadVyawasthaPayment`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      setUploadStatus("Upload successful!");
      toast.success("Receipt uploaded successfully!");
      setDonationStatus({
        paid: true,
        transactionId: response.data.transactionId,
      });
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      toast.error("Upload failed...");
    } finally {
      setIsUploading(false);
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

      {/* Bank Details Card */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v4H4v-4z" clipRule="evenodd" />
          </svg>
          <h3 className="font-bold text-gray-800 text-lg">Bank Details</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-gray-600 font-medium">Account Holder:</span>
            <span className="font-semibold text-gray-800">Advocate Self Care Samiti</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-gray-600 font-medium">Account No:</span>
            <span className="font-mono font-semibold text-gray-800 bg-white px-3 py-1 rounded-lg border">42721613653</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-gray-600 font-medium">IFSC Code:</span>
            <span className="font-mono font-semibold text-gray-800 bg-white px-3 py-1 rounded-lg border">SBIN0006211</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-gray-600 font-medium">Branch:</span>
            <span className="font-semibold text-gray-800">COURT AREA, BASTI, UP 272001</span>
          </div>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Payment Receipt</h3>
              <p className="text-gray-600 text-sm mb-4">Please upload your payment receipt to complete the donation</p>
            </div>
            
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              onClick={() => document.getElementById(`file-input-${_id}`).click()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Choose Receipt File</span>
            </button>
            
            <input
              id={`file-input-${_id}`}
              type="file"
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            
            {selectedFile && (
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{uploadStatus}</p>
                  </div>
                </div>
                
                {isUploading && (
                  <div className="w-24 h-24 mx-auto">
                    <CircularProgressbar
                      value={uploadProgress}
                      text={`${uploadProgress}%`}
                      styles={buildStyles({
                        textSize: "16px",
                        pathColor: `rgba(59, 130, 246, ${uploadProgress / 100})`,
                        textColor: "#1f2937",
                        trailColor: "#e5e7eb",
                        pathTransitionDuration: 0.5,
                      })}
                    />
                  </div>
                )}
                
                <button
                  className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${
                    isUploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  } text-white flex items-center justify-center space-x-2`}
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Upload Receipt</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )
      )}
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default VyawasthaCard;