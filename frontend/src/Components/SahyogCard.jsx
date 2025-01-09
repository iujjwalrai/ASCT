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
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto md:mx-0">
      <h1 className="text-red-800 text-2xl font-bold">{user.name}</h1>
      <h1 className="text-blue-600 text-lg font-medium mt-2">
        Reg No: {user.RegNo}
      </h1>
      <h1 className="text-orange-500 text-lg font-medium mt-1">
        COP No: {user.COPNo}
      </h1>
      <h1 className="text-black text-lg font-semibold mt-1">
        Amount: ₹{amount}
      </h1>
      <h1 className="text-red-950 font-bold text-lg mt-2">Nominee Details:</h1>
      <div className="mt-2">
        <p className="text-gray-700">
          <strong>Name:</strong> {nomineeName}
        </p>
        <p className="text-gray-700">
          <strong>Account No.1:</strong> {nomineeAccount1No}
        </p>
        <p className="text-gray-700">
          <strong>IFSC:</strong> {nomineeAccount1ifsc}
        </p>
        {nomineeAccount2No && (
          <p className="text-gray-700">
            <strong>Account No.2:</strong> {nomineeAccount2No}
          </p>
        )}
        {nomineeAccount2ifsc && (
          <p className="text-gray-700">
            <strong>IFSC:</strong> {nomineeAccount2ifsc}
          </p>
        )}
      </div>
      <div className="mt-4">
        {donationStatus.paid ? (
          <div className="text-green-600 font-semibold text-lg">
            You have already donated.
            <p className="text-gray-500 text-sm">
              Transaction ID: {donationStatus.transactionId}
            </p>
          </div>
        ) : isCompleted ? (
          <div className="text-red-600 font-semibold text-lg">
            Donation is over.
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => document.getElementById("file-input").click()}
            >
              Choose Receipt
            </button>
            <input
              id="file-input"
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
        )}
      </div>
    </div>
  );
};

export default SahyogCard;
