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
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      <h1 className="text-red-700 font-bold text-xl mb-2">{name}</h1>
      <p className="text-blue-600 text-md text-center mb-2">{description}</p>
      <p className="text-orange-600 font-semibold text-lg">Amount: ₹{amount}</p>
      <p className={`text-lg font-bold mt-2 ${isCompleted ? 'text-green-600' : 'text-red-600'}`}>
        {isCompleted ? 'Donation is now over' : 'Donation in progress'}
      </p>
      <div className="mt-6 text-center text-sm text-gray-700 border-t pt-4 w-full">
        <p className="font-semibold text-gray-800">Name: Advocate Self Care Samiti</p>
        <p>Account No.: <span className="font-mono">42721613653</span></p>
        <p>IFSC: <span className="font-mono">SBIN0006211</span></p>
        <p>COURT AREA, BASTI, UTTAR PRADESH 272001</p>
      </div>
      {donationStatus.paid ? (
        <div className="mt-2 text-center">
          <p className="text-green-600 font-semibold">You have already donated!</p>
          <p className="text-gray-500 text-sm">Transaction ID: {donationStatus.transactionId}</p>
        </div>
      ) : (
        !isCompleted && (
          <div className="mt-4 w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById(`file-input-${_id}`).click()}
            >
              Choose Receipt
            </button>
            <input
              id={`file-input-${_id}`}
              type="file"
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <>
                <div className="mt-3 text-sm font-medium text-gray-600">
                  {uploadStatus}
                </div>
                <div className="mt-3 w-32 mx-auto">
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${uploadProgress}%`}
                    styles={buildStyles({
                      textSize: "12px",
                      pathColor: `rgba(62, 152, 199, ${uploadProgress / 100})`,
                      textColor: "#333",
                      trailColor: "#ddd",
                    })}
                  />
                </div>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded w-full mt-3"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default VyawasthaCard;
