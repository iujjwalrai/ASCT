import logo from "../assets/images/Logo_Transparent_BG.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-50"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-50 opacity-70"></div>
        <div className="absolute -bottom-16 right-1/3 w-80 h-80 rounded-full bg-blue-50 opacity-50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-10 pb-10 md:pt-20 md:pb-10 lg:pt-10 lg:pb-10 flex flex-col md:flex-row items-center justify-evenly">
          {/* Left Content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0">
            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 font-bold text-sm rounded-full mb-5">
              आज का सहयोग कल का सहारा
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              In Support of <span className="text-blue-600">Advocates</span> and <span className="text-blue-600"> their families</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Our aim is to support the Advocates and their families when they need the most. We have taken a initative and we pledge to fulfil it.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Login to ASCT
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-sm border border-blue-200 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Register Now!
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="w-full md:w-1/3 relative">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              {/* Primary image */}
              <div className="aspect-w-4 aspect-h-3 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
                <div className="w-full h-full bg-white flex items-center justify-center">
                  {/* Replace this with your actual image */}
                  <div className="text-center flex justify-center">
                    <img src = {logo} className="md:w-[250px] w-[70%]"></img>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-3xl font-bold text-blue-600">....</p>
                <p className="text-gray-600 text-sm">Registraions done</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-3xl font-bold text-blue-600">...</p>
                <p className="text-gray-600 text-sm">Support completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;