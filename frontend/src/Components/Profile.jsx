import React from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { upDistrictsAndTehsils } from "../assets/upDistrictsAndTeshils";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/slices/userSlice";
import { IoMdCloseCircle } from "react-icons/io";

const Profile = () => {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const districts = Object.keys(upDistrictsAndTehsils);

  const [selectedDistrict, setSelectedDistrict] = useState(user.Jila || "");
  const [tehsils, setTehsils] = useState([]);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    document.body.style.overflow = "hidden";
    setIsPopUpOpen(true);
  };
  const closePopUp = () => {
    setIsPopUpOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleDistrictChange = (event) => {
    const dist = event.target.value;
    setSelectedDistrict(dist);

    setTehsils(dist ? upDistrictsAndTehsils[dist] : []);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: user.email || "",
      Gender: user.Gender || "",
      BloodGroup: user.BloodGroup || "",
      AdPractice: user.AdPractice || "",
      Jila: user.Jila || "",
      Tehsil: user.Tehsil || "",
      HomeDistrict: user.HomeDistrict || "",
      HomeAddress: user.HomeAddress || "",
      firstNomineeName: user.firstNomineeName || "",
      firstNomineeMobile: user.firstNomineeMobile || "",
      firstNomineeRelation: user.firstNomineeRelation || "",
      secondNomineeName: user.secondNomineeName || "",
      secondNomineeMobile: user.secondNomineeMobile || "",
      secondNomineeRelation: user.secondNomineeRelation || "",
    },
  });

  const submitHandler = async (data) => {
    const formData = { ...data, Jila: selectedDistrict };
    try {
      const resServer = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/update-profile`,
          JSON.stringify(formData),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        ),
        {
          loading: "Updating the Profile on ASCT - UP",
          success: <b>Updated the profile successfully</b>,
          error: <b>Error in updating the profile</b>,
        }
      );
      dispatch(setUser(resServer.data.user));
      closePopUp();
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-600 mt-2">Manage your profile information</p>
              </div>
              <div className="hidden md:block w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-whitefont-bold">
                <p className="text-center py-6 text-4xl font-bold text-white">{user.name?.charAt(0)}</p>
              </div>
            </div>
          </div>

          {/* Basic Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
              Basic Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                <p className="text-lg font-semibold text-gray-800">{user.RegNo}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
                <p className="text-sm text-gray-600 mb-1">Gender</p>
                <p className="text-lg font-semibold text-gray-800">{user.Gender}</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-100">
                <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                <p className="text-lg font-semibold text-gray-800">{user.DOB}</p>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
                <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                <p className="text-lg font-semibold text-gray-800">{user.mobile}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                <p className="text-sm text-gray-600 mb-1">COP Number</p>
                <p className="text-lg font-semibold text-gray-800">{user.COPNo}</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100">
                <p className="text-sm text-gray-600 mb-1">COP Year</p>
                <p className="text-lg font-semibold text-gray-800">{user.COPNoYear}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-4 border border-indigo-100">
                <p className="text-sm text-gray-600 mb-1">Registration Year</p>
                <p className="text-lg font-semibold text-gray-800">{user.RegNoYear}</p>
              </div>
            </div>
          </div>

          {/* Practice Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-4"></div>
              Practice Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Practice District</p>
                <p className="text-lg font-semibold text-gray-800">{user.Jila}</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-100">
                <p className="text-sm text-gray-600 mb-1">Tehsil</p>
                <p className="text-lg font-semibold text-gray-800">{user.Tehsil}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Practice Level</p>
                <p className="text-lg font-semibold text-gray-800">{user.AdPractice}</p>
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 border border-red-100">
                <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                <p className="text-lg font-semibold text-gray-800">{user.BloodGroup}</p>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
                <p className="text-sm text-gray-600 mb-1">Home District</p>
                <p className="text-lg font-semibold text-gray-800">{user.HomeDistrict}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Home Address</p>
              <p className="text-lg font-semibold text-gray-800">{user.HomeAddress}</p>
            </div>
          </div>

          {/* Nominee Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
              Nominee Information
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* First Nominee */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary Nominee</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-base font-medium text-gray-800">{user.firstNomineeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Relation</p>
                    <p className="text-base font-medium text-gray-800">{user.firstNomineeRelation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="text-base font-medium text-gray-800">{user.firstNomineeMobile}</p>
                  </div>
                </div>
              </div>

              {/* Second Nominee */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary Nominee</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-base font-medium text-gray-800">{user.secondNomineeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Relation</p>
                    <p className="text-base font-medium text-gray-800">{user.secondNomineeRelation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="text-base font-medium text-gray-800">{user.secondNomineeMobile}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="text-center">
              <p className="text-gray-600 mb-6 text-lg">Ready to update your information?</p>
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={openPopUp}
              >
                ✏️ Edit Profile Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isPopUpOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closePopUp}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
              <h1 className="text-2xl font-bold text-center">Edit Profile Details</h1>
              <IoMdCloseCircle
                className="absolute top-4 right-4 text-4xl cursor-pointer hover:text-red-300 transition-colors"
                onClick={closePopUp}
              />
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
                {/* Non-editable Fields */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Read-Only Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">COP No.</label>
                      <input
                        type="text"
                        value={user.COPNo}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reg No.</label>
                      <input
                        type="text"
                        value={user.RegNo}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No.</label>
                      <input
                        type="text"
                        value={user.mobile}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-200 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Editable Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("email")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("Gender")}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("BloodGroup")}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Practice Level *</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("AdPractice")}
                      >
                        <option value="Jila Nyayalay">Jila Nyayalay</option>
                        <option value="Uchh Nyayalay">Uchh Nyayalay</option>
                        <option value="Tehsil Nyayalay">Tehsil Nyayalay</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                      >
                        {districts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tehsil *</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("Tehsil")}
                      >
                        {tehsils.map((tehsil) => (
                          <option key={tehsil} value={tehsil}>{tehsil}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Home District *</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        {...register("HomeDistrict")}
                      >
                        {districts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Home Address *</label>
                    <input
                      type="text"
                      placeholder="Enter your home address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      {...register("HomeAddress")}
                    />
                  </div>

                  {/* Nominee Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Primary Nominee</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={user.firstNomineeName}
                            {...register("firstNomineeName")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={user.firstNomineeRelation}
                            {...register("firstNomineeRelation")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={user.firstNomineeMobile}
                            {...register("firstNomineeMobile")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Secondary Nominee</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={user.secondNomineeName}
                            {...register("secondNomineeName")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={user.secondNomineeRelation}
                            {...register("secondNomineeRelation")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={user.secondNomineeMobile}
                            {...register("secondNomineeMobile")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Disease/Medical Information</label>
                    <input
                      type="text"
                      placeholder="Enter any medical conditions or diseases (if applicable)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      {...register("disease")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  💾 Update Profile Details
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;