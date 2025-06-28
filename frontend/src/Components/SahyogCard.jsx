import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import toast from "react-hot-toast";

const SahyogCard = ({ sahyog }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("No file uploaded");
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();

  const {
    user,
    amount,
    isCompleted,
    _id,
    nomineeAccount1No,
    nomineeAccount1ifsc,
    nomineeAccount2No,
    nomineeAccount2ifsc,
    nomineeName,
  } = sahyog;

  const advo = useSelector((state) => state.user.userDetails);

  const [donationStatus, setDonationStatus] = useState({
    paid: false,
    transactionId: null,
  });

  useEffect(() => {
    const fetchDonationStatus = async () => {
      try {
        const responseFromCheck = await axios.get(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/checkSahyog`,
          { params: { userId: advo._id, sahyogId: _id }, withCredentials: true }
        );
        setDonationStatus({
          paid: responseFromCheck.data.donated,
          transactionId: responseFromCheck.data.transactionId,
        });
      } catch (e) {
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
    formData.append("sahyogId", _id);
    formData.append("amount", amount);
    try {
      console.log([...formData.entries()]);
      const response = await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/uploadSahyogPayment`,
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
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      toast.error("Upload failed...")
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 h-full flex flex-col">
      {/* Header Section */}
      <div className="mb-6 flex-shrink-0">
        <div className="flex items-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                Reg: {user.RegNo}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                COP: {user.COPNo}
              </span>
            </div>
          </div>
        </div>
        
        <div className="inline-flex items-center bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
          ₹{amount}
        </div>
      </div>

      {/* Nominee Details Card */}
      <div className="flex-1 mb-6">
        <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <h3 className="font-bold text-gray-800 text-lg">Nominee Details</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="font-semibold text-gray-800">{nomineeName}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 font-medium">Account No.1:</span>
              <span className="font-mono font-semibold text-gray-800 bg-white px-2 py-1 rounded border">{nomineeAccount1No}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 font-medium">IFSC:</span>
              <span className="font-mono font-semibold text-gray-800 bg-white px-2 py-1 rounded border">{nomineeAccount1ifsc}</span>
            </div>
            
            {nomineeAccount2No && (
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-600 font-medium">Account No.2:</span>
                <span className="font-mono font-semibold text-gray-800 bg-white px-2 py-1 rounded border">{nomineeAccount2No}</span>
              </div>
            )}
            
            {nomineeAccount2ifsc && (
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-600 font-medium">IFSC:</span>
                <span className="font-mono font-semibold text-gray-800 bg-white px-2 py-1 rounded border">{nomineeAccount2ifsc}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex-shrink-0">
        {donationStatus.paid ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-2">Donation Complete!</h3>
            <p className="text-green-700 mb-3">Thank you for your contribution</p>
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Transaction ID:</p>
              <p className="font-mono text-sm font-semibold text-gray-800">{donationStatus.transactionId}</p>
            </div>
          </div>
        ) : isCompleted ? (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-red-800">Donation Closed</h3>
            <p className="text-red-700">This sahyog is no longer accepting donations</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Payment Receipt</h3>
              <p className="text-gray-600 text-sm mb-4">Please upload your payment receipt to complete the sahyog</p>
            </div>
            
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              onClick={() => document.getElementById("file-input").click()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Choose Receipt File</span>
            </button>
            
            <input
              id="file-input"
              type="file"
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            
            {selectedFile && (
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
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
                  <div className="w-20 h-20 mx-auto">
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
        )}
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SahyogCard;