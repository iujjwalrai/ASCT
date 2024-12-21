import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
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
        console.log(responseFromCheck);
        setDonationStatus({
          paid: responseFromCheck.data.donated,
          transactionId: responseFromCheck.data.transactionId,
        });
      } catch (e) {
        console.error("Error checking donation status", e);
      }
    };

    fetchDonationStatus();
  }, [advo._id, _id]);

  console.log(advo.email);
  console.log(advo.mobile);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(`Selected file: ${file.name}`);
    }
  };

  const handleUpload = async()=>{
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
      const response = await axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/uploadSahyogPayment`,
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
      console.log("Uploaded file URL:", response.data.url); // Cloudinary URL
    }
    catch(error){
      setUploadStatus("Upload failed. Please try again.");
      console.error("Error uploading file:", error);
    }
    finally{
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-55 px-8 py-5 rounded-lg w-[450px]">
      <h1 className="text-red-800 text-3xl font-bold">{user.name}</h1>
      <h1 className="text-blue-800 text-xl font-semibold mt-1">
        Reg No: {user.RegNo}
      </h1>
      <h1 className="text-orange-500 text-xl font-semibold mt-1">
        COP No: {user.COPNo}
      </h1>
      <h1 className="text-black text-xl font-semibold mt-1">
        Amount: ₹{amount}
      </h1>
      <h1 className="text-red-950 font-bold text-xl mt-1">
        Nominee Details is as follows:{" "}
      </h1>
      <h1 className="text-black text-xl font-semibold mt-1">
        Nominee Name/Account Holder's Name: {nomineeName}
      </h1>
      <h1 className="text-red-600 text-xl font-semibold mt-1">
        Account No.1 : {nomineeAccount1No}
      </h1>
      <h1 className="text-red-600 text-xl font-semibold mt-1">
        Account No.1 IFSC: {nomineeAccount1ifsc}
      </h1>
      <h1 className="text-blue-600 text-xl font-semibold mt-1">
        Account No.2 : {nomineeAccount2No}
      </h1>
      <h1 className="text-blue-600 text-xl font-semibold mt-1">
        Account No.2 IFSC: {nomineeAccount2ifsc}
      </h1>
      <h1 className="text-red-800 text-2xl font-bold">
        {isCompleted ? `Donation is now over` : `Donation is in progress`}
      </h1>
      {donationStatus.paid ? (
        <div className="text-green-600 font-semibold text-2xl">
          You have already donated.
          <div className="text-gray-600 text-sm">
            Transaction ID: {donationStatus.transactionId}
          </div>
        </div>
      ) : (
        !isCompleted && (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById("file-input").click()}
            >
              Click here to choose the receipt of the sahyog
            </button>
            <input
              id="file-input"
              type="file"
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div style={{ marginTop: "10px", fontWeight: "bold" }}>
              {uploadStatus}
            </div>
            {selectedFile && (
              <>
                <div style={{ width: "100px", margin: "20px auto" }}>
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${uploadProgress}%`}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor: `rgba(62, 152, 199, ${uploadProgress / 100})`,
                      textColor: "#4d4d4d",
                      trailColor: "#d6d6d6",
                    })}
                  />
                </div>
                <button
                  onClick={handleUpload}
                  style={{ marginTop: "10px" }}
                  disabled={isUploading} className="bg-red-500 w-[100%] rounded-lg text-white py-2"
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

export default SahyogCard;
