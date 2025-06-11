import React from "react";
import Hero from "../Components/Hero";
import Founders from "../Components/Founders";
import { founders } from "../assets/founderData";
import Teams from "../Components/Teams";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import FoundersCarousel from "../Components/FoundersCarousel";
const Home = () => {
  return (
    <div>
      <Hero />
      <div className="py-4">
        <p className="w-[90vw] mx-auto font-bold pt-6">
          <p className="text-center w-[100%] text-2xl">
            Welcome to Advocates Self Care Team - Uttar Pradesh.{" "}
          </p>
          <p className="text-center w-[100%] mb-8 text-2xl mt-6">
            ASCT: Advocates Self Care Team उत्तर प्रदेश की वेबसाइट पर आपका
            स्वागत है।{" "}
          </p>
          हमारा उद्देश्य वकीलों और उनके परिवारों को कठिन समय में सहायता प्रदान
          करना है। जब किसी वकील को मृत्यु या चोट जैसी समस्याओं का सामना करना
          पड़ता है, तो हम आर्थिक सहायता के माध्यम से उनकी मदद करते हैं। यह
          सहायता यूपी के उन वकीलों द्वारा दी जाती है जो हमारी वेबसाइट पर पंजीकरण
          कराते हैं। हमारा मुख्य लक्ष्य वकीलों और उनके परिवारों को समर्थन और
          सहायता प्रदान करना है, ताकि वे ऐसे संकट में अकेले न पड़ें। हम एकजुटता
          और सहयोग की भावना से कार्य करते हैं, जिससे सभी वकील एक-दूसरे का सहारा
          बन सकें।
        </p>
      </div>
      <FoundersCarousel founders={founders} />
      <div className="bg-[#144e85] mt-8 pt-14 pb-14">
        <h2 className="text-white text-center text-3xl font-bold mb-8">
          We’re On A Mission To Solve Problems of Advocates
        </h2>
        <div className="md:flex md:flex-row md:justify-evenly flex flex-col items-center">
          <div className="md:flex md:flex-col md:w-[40%] md:gap-y-12 flex flex-col w-[70%] gap-y-8">
            <div className="bg-orange-600 text-white p-5 rounded-lg">
              ASCT अधिवक्ताओं का, अधिवक्ताओं के लिए, अधिवक्ताओं के द्वारा समूह
              से जुड़े अधिवक्ताओं के असामयिक मृत्यु होने पर उनके परिवार को आर्थिक
              सहायता देने हेतु बनाया गया है।
            </div>
            <div className=" bg-white p-5 rounded-lg">
              ASCT का लक्ष्य है कि प्रदेश के सभी अधिवक्ता इस टीम से जुड़े और टीम
              के किसी भी विधिक सदस्य की असामयिक मृत्यु पर उसके परिवार को सहयोग
              किया जाय।
            </div>
            <div className=" bg-green-700 p-5 rounded-lg text-white">
              ASCT में उत्तर प्रदेश बार काउंसिल से पंजीकृत कोई भी अधिवक्ता जिसके
              पास पंजीकरण संख्या उपलब्ध है, वह जुड़ सकता है।
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dkvuuyi2k/image/upload/v1730814157/lowerSection_xr6wzw.png"
            className="md:w-[400px] md:rounded-xl w-[70%] rounded-3xl mt-10"
          ></img>
        </div>
      </div>
      <div className="bg-orange-500 p-14">
        <h3 className="text-white text-4xl font-bold text-center mb-6">
          आवश्यक सूचना
        </h3>
        <p className="text-white text-lg px-10">
          केवल टेलीग्राम ग्रुप से जुड़ने या केवल रजिस्ट्रेशन कर देने से कोई भी
          अधिवक्ता वैधानिक सदस्य नही माना जायेगा, नियमावली के अंतर्गत सहयोग करना
          अनिवार्य रहेगा। सहयोग करके अपनी प्रोफाइल पर रसीद अपलोड करना अनिवार्य
          होगा।
        </p>
      </div>
      <div className="pt-10 text-blue-600 font-semibold text-4xl text-center pb-10">
        Our Team
      </div>
      <Teams />
      <div className="flex flex-col lg:flex-row py-10 lg:py-20 px-4 lg:px-20 justify-between">
        <div className="max-w-full lg:max-w-[50%] text-center lg:text-left">
          <p className="bg-[#d1e7ff] inline-block p-1 px-3 rounded-full text-blue-900 font-bold text-sm">
            Winning Hearts
          </p>
          <h1 className="text-blue-900 text-3xl lg:text-4xl font-bold mt-4 lg:mt-8">
            आपका सहयोग अपनों का सहारा
          </h1>
          <p className="mt-4 lg:mt-8">
            ASCT द्वारा अब तक -- वकीलों के परिवारों को आर्थिक सहायता प्रदान की
            जा चुकी है।
          </p>
          <Link to="/about">
            <button className="mt-4 lg:mt-8 bg-yellow-500 py-2 px-4 rounded-lg">
              About Us
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-6 sm:gap-y-10 mt-10 lg:mt-0 lg:grid-cols-2">
          <div className="py-4 bg-[#f8f9fa] flex flex-col justify-center border-l-4 border-l-blue-500 rounded-2xl px-4">
            <p className="text-center font-bold text-2xl lg:text-3xl">--</p>
            <p className="text-center text-sm lg:text-base">
              से ज़्यादा पंजीकृत वकील
            </p>
          </div>
          <div className="py-4 bg-[#f8f9fa] flex flex-col justify-center border-l-4 border-l-pink-500 rounded-2xl px-4">
            <p className="text-center font-bold text-2xl lg:text-3xl">--</p>
            <p className="text-center text-sm lg:text-base">आकस्मिक मदद</p>
          </div>
          <div className="py-4 bg-[#f8f9fa] flex flex-col justify-center border-l-4 border-l-green-500 rounded-2xl px-4">
            <p className="text-center font-bold text-2xl lg:text-3xl">--</p>
            <p className="text-center text-sm lg:text-base">आर्थिक मदद</p>
          </div>
          <div className="py-4 bg-[#f8f9fa] flex flex-col justify-center border-l-4 border-l-yellow-500 rounded-2xl px-4">
            <p className="text-center font-bold text-2xl lg:text-3xl">--</p>
            <p className="text-center text-sm lg:text-base">
              दिवंगत अधिवक्ता से अधिक की मदद
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
