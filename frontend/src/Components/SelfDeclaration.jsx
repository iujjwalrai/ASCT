import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

const SelfDeclaration = () => {
  const advo = useSelector((state)=>state.user.userDetails);
  const {register, handleSubmit, formState: { errors }} = useForm();

  const submitHandler = async(data)=>{
    try{
        data.userId = advo._id;
        const responseFromServer = await toast.promise(axios.put(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/selfDeclaration`, data, {
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials: true
        }), {
            loading: "Declaring the self declaration",
            success: <b>Declared the self declaration</b>,
            error: <b>An error occured while declaring the self declaration</b>
        });

    }
    catch(er){
        toast.error("Some error occured");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      
      <div className="flex flex-col lg:flex-row gap-6 relative z-10">
        <Sidebar/>
        
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 lg:p-8 mb-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Self Declaration Form
                </h1>
                <p className="text-lg text-red-600 font-semibold">
                  Please read the following declaration carefully before proceeding
                </p>
              </div>
            </div>

            {/* Main Declaration Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 lg:p-8">
              {/* Important Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-blue-800 font-medium text-sm lg:text-base">
                    Kindly check the checkbox only if you have read and agree with the Self Declaration below
                  </p>
                </div>
              </div>

              {/* Declaration Text */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                    I <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.name}</span> bearing 
                    COP No. <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.COPNo}</span> and 
                    Registration No. <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.RegNo}</span> hereby 
                    declare that I normally do my legal practice at <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.Jila}</span> in 
                    the <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.AdPractice}</span>. 
                    I belong to the <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.HomeDistrict}</span> District 
                    of Uttar Pradesh and my Home Address is <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{advo.HomeAddress}</span>.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mt-4 text-sm lg:text-base">
                    I have read and fully understood all the rules, terms and conditions, operations, protocols, and methodologies 
                    associated with ASCT (Advocates Self Care Team - Uttar Pradesh). I acknowledge and agree to abide by all the 
                    stated guidelines, policies, and procedures, and I accept the responsibilities outlined therein.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mt-4 text-sm lg:text-base">
                    I will keep myself updated with the rules, terms, conditions, operations, protocols, and methodologies of 
                    ASCT (Advocates Self Care Team - Uttar Pradesh) as they are updated from time to time, and I agree to abide 
                    by all such rules. I further confirm that neither I nor my family will exert any pressure on ASCT for any 
                    benefits contrary to these rules. I also consent that any benefits will be provided to me or my family only 
                    in accordance with the applicable rules. I understand that neither I nor my family will be entitled to file 
                    any judicial or legal claim in this regard. I am committed to following all the rules and terms applicable to me.
                  </p>
                </div>
              </div>

              {/* Agreement Form */}
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <label htmlFor="agree" className="flex items-start space-x-4 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="agree" 
                        {...register("agree", { required: "You must agree to proceed" })}
                        className="w-5 h-5 text-green-600 bg-white border-2 border-green-300 rounded focus:ring-green-500 focus:ring-2 transition-all duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-green-800 font-semibold text-sm lg:text-base group-hover:text-green-900 transition-colors">
                        I agree to the terms and conditions and the above Self Declaration
                      </span>
                      {errors.agree && (
                        <div className="mt-2 flex items-center space-x-2">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.agree.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button 
                    type="submit" 
                    className="group relative inline-flex items-center justify-center px-8 lg:px-12 py-3 lg:py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    <svg className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Submit Declaration
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfDeclaration