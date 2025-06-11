import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Users,
  Shield,
  Heart,
  AlertCircle,
  Phone,
  FileText,
  Clock,
  DollarSign,
  X,
} from "lucide-react";
import Footer from "../Components/Footer";

const Niyamawali = () => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRule(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const rules = [
    {
      id: "registration",
      title: "पंजीकरण और सदस्यता",
      subtitle: "Registration & Membership",
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-500",
      content: [
        "ASCT से जुड़ने हेतु आवश्यक सूचना संबंधी फॉर्म भरकर रजिस्ट्रेशन अनिवार्य है",
        "टेलीग्राम/व्हाट्सअप ग्रुप से जुड़ना अनिवार्य है जहाँ सभी आधिकारिक सूचनाएं दी जाती हैं",
        "सप्ताह में कम से कम 2 बार ग्रुप देखना अनिवार्य है",
        "सदस्यता शुल्क पूर्णतः निःशुल्क है, बल्कि व्यवस्था शुल्क ₹50 जमा करना है। केवल दिवंगत अधिवक्ताओं के परिवार को सहयोग भेजना आवश्यक है",
        "हेल्पलाइन नंबर: 7007357961 / 7007074437 उपलब्ध है",
      ],
    },
    {
      id: "lockperiod",
      title: "लॉक-इन अवधि",
      subtitle: "Lock-in Period",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-orange-500",
      content: [
        "सामान्य मृत्यु के लिए 90 दिन का लॉक-इन पीरियड",
        "गंभीर बीमारी की स्थिति में 1 वर्ष का लॉक-इन पीरियड",
        "दुर्घटना में इलाज हेतु सहयोग रजिस्ट्रेशन के 6 माह बाद से शुरू",
        "लॉक-इन पीरियड के दौरान मृत्यु होने पर सहयोग नहीं मिलेगा",
        "गंभीर बीमारी की जानकारी प्रोफाइल में दर्ज करना अनिवार्य",
      ],
    },
    {
      id: "support",
      title: "सहयोग नियम",
      subtitle: "Support Rules",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-red-500",
      content: [
        "सभी सहयोग करना अनिवार्य है सहयोग प्राप्त करने हेतु",
        "सहयोग के बाद गूगल फॉर्म भरकर रसीद अपलोड करना अनिवार्य",
        "बिना सहयोग किये सहयोग प्राप्त करने हेतु पात्र नहीं माना जाएगा",
        "न्यूनतम सहयोग राशि वर्तमान में ₹100 है",
        "सदस्य संख्या बढ़ने पर इसे ₹50 किया जाएगा",
      ],
    },
    {
      id: "validity",
      title: "वैधता बहाली",
      subtitle: "Validity Restoration",
      icon: <Shield className="w-5 h-5" />,
      color: "bg-green-500",
      content: [
        "10 सहयोग से पहले 1-2 सहयोग ब्रेक होने पर: लगातार 3 सहयोग करके वैधता बहाल",
        "2 से अधिक सहयोग ब्रेक होने पर: लगातार 5 सहयोग + 3 माह लॉक-इन पीरियड",
        "वाजिब कारण से सहयोग न कर पाने पर सदस्यता नहीं जाएगी",
        "प्रति सदस्य केवल 1 बार वैधता बहाली का अवसर",
      ],
    },
    {
      id: "special",
      title: "विशेष परिस्थितियां",
      subtitle: "Special Circumstances",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "bg-purple-500",
      content: [
        "आत्महत्या या विवादित मामलों में कोर टीम जांच करके निर्णय लेगी",
        "एक से अधिक मृत्यु होने पर तिथि के क्रम में सहयोग",
        "समान तिथि की मृत्यु में सहयोग प्रतिशत के आधार पर प्राथमिकता",
        "नॉमिनी संबंधी विवाद में प्रदेश/कोर टीम निर्णय लेगी",
        "गलत राशि भेजने पर वापसी की व्यवस्था नहीं है",
      ],
    },
    {
      id: "discipline",
      title: "अनुशासन और नियम",
      subtitle: "Discipline & Rules",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-indigo-500",
      content: [
        "अनुशासनहीनता या ASCT विरोधी गतिविधि पर कार्रवाई",
        "अन्य समान टीम में सदस्य हो सकते हैं लेकिन पदाधिकारी नहीं",
        "दुष्प्रचार या अफवाह फैलाने पर कार्रवाई",
        "कूटरचित/फर्जी रसीद पर सदस्यता समाप्ति",
        "समय और आवश्यकता अनुसार नियमों में संशोधन का अधिकार",
      ],
    },
    {
      id: "management",
      title: "व्यवस्था शुल्क",
      subtitle: "Management Fee",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-teal-500",
      content: [
        "₹50 वार्षिक व्यवस्था शुल्क अनिवार्य है",
        "दुर्घटना में ₹1 लाख से अधिक बिल पर ₹25,000-50,000 की मदद",
        "केवल दुर्घटना में मिलेगी, बीमारी में नहीं (भविष्य में विचार)",
        "स्थानीय निरीक्षण के बाद सहयोग",
        "वेबसाइट, ऐप, SMS सुविधा, ऑफिस संचालन में उपयोग",
      ],
    },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              एडवोकेट सेल्फ केयर टीम - नियमावली
            </h1>
            <h2 className="text-2xl text-blue-600 mb-2">
              Advocates Self Care Team - Uttar Pradesh
            </h2>
            <p className="text-lg text-gray-600 font-semibold">
              आपका सहयोग अपनों का सहारा
            </p>
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>7007357961 / 7007074437</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                महत्वपूर्ण सूचना
              </h3>
              <p className="text-yellow-700">
                सदस्यों द्वारा दिया गया सहयोग सीधा मृतक अधिवक्ता के नॉमिनी को
                दिया जाता है। सहयोग के बदले सहयोग प्राप्त करने का कोई कानूनी
                अधिकार नहीं है। यह पूर्णतः सदस्यों की इच्छा पर निर्भर है।
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-xl py-8 font-bold">
          Click{" "}
          <a
            href="https://www.dropbox.com/scl/fi/5gci35bo383dvdgph703j/Rules.pdf?rlkey=ck8irlnkx8q9ci0biilntlchu&st=n5b7a3u2&dl=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500"
          >
            here
          </a>{" "}
          to Download the Niyamawali Of Advoacates Self Care Team - Uttar
          Pradesh
        </p>
        <div className="font-bold text-lg">
          <p>
            Else, you can explore each rule section by clicking on the tiles
            below. In case of any conflict between the rules displayed on the
            tile and those mentioned in the{" "}
            <span className="text-red-600">
              <a
                href="https://www.dropbox.com/scl/fi/5gci35bo383dvdgph703j/Rules.pdf?rlkey=ck8irlnkx8q9ci0biilntlchu&st=n5b7a3u2&dl=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF
              </a>
            </span>{" "}
            above, the rules stated in the PDF shall prevail.<br></br>{" "}
            <b>Regards ASCT - UP</b>
          </p>
        </div>
        <div className="font-bold text-lg mt-8">
          <p>
            अन्यथा, आप नीचे दिए गए टाइल्स पर क्लिक करके प्रत्येक नियम अनुभाग को
            देख सकते हैं। यदि टाइल पर दिखाए गए नियमों और ऊपर दिए गए
            <span className="text-red-600">
              <a
                href="https://www.dropbox.com/scl/fi/5gci35bo383dvdgph703j/Rules.pdf?rlkey=ck8irlnkx8q9ci0biilntlchu&st=n5b7a3u2&dl=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF
              </a>
            </span>
            में लिखे नियमों के बीच कोई विरोध होता है, तो PDF में लिखे गए नियम ही
            मान्य माने जाएंगे।
            <br></br>
            <b>सादर, ASCT - UP</b>
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => openModal(rule)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${rule.color} text-white`}>
                    {rule.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-gray-500">{rule.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  विस्तार से देखने के लिए क्लिक करें
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Principles */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            मुख्य सिद्धांत
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">जो सहयोग करेगा</h4>
              <p className="text-sm opacity-90">उसे ही सहयोग मिलेगा</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">पारदर्शिता</h4>
              <p className="text-sm opacity-90">सभी नियम स्पष्ट और पारदर्शी</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">एकजुटता</h4>
              <p className="text-sm opacity-90">सभी अधिवक्ताओं का कल्याण</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            किसी भी विवाद की स्थिति में वेबसाइट पर अपलोड नियमावली की प्रति ही
            मान्य होगी।
          </p>
          <p className="mt-2">
            <strong>नोट:</strong> नियमों में समय और आवश्यकता के अनुसार संशोधन का
            अधिकार ASCT के पास सुरक्षित है।
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto transform transition-all duration-300 animate-bounce"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            }}
          >
            {selectedRule && (
              <>
                {/* Modal Header */}
                <div
                  className={`${selectedRule.color} text-white p-6 rounded-t-2xl`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                        {selectedRule.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          {selectedRule.title}
                        </h3>
                        <p className="text-lg opacity-90">
                          {selectedRule.subtitle}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <ul className="space-y-4">
                    {selectedRule.content.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${selectedRule.color}`}
                        ></div>
                        <span className="text-gray-700 leading-relaxed text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Footer */}
                <div className="px-6 pb-6">
                  <button
                    onClick={closeModal}
                    className={`w-full py-3 ${selectedRule.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200`}
                  >
                    समझ गया / Got it
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Niyamawali;
