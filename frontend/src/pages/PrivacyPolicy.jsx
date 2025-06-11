import React from 'react';
import { Shield, Mail, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import Footer from "../Components/Footer"
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy & Disclaimer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy and trust matter to us. Please review our policies for using the ASCT platform.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-10">
          
          {/* Contact Section */}
          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you require any more information or have any questions about our site's disclaimer, 
                  please feel free to contact us by email at{' '}
                  <a href="mailto:advocatesselfcareteam@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium underline">
                    advocatesselfcareteam@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Website Disclaimer */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Disclaimers for asctup.com</h2>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                All the information on this website –{' '}
                <span className="font-semibold text-indigo-700">https://asctup.com/</span> – is published in good faith 
                and for general information purpose only. asctup.com does not make any warranties about the completeness, 
                reliability and accuracy of this information.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-400">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Risk Acknowledgment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Any action you take upon the information you find on this website (asctup.com), is strictly at your own risk. 
                    asctup.com will not be liable for any losses and/or damages in connection with the use of our website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* External Links Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <ExternalLink className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">External Links Policy</h2>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                From our website, you can visit other websites by following hyperlinks to such external sites. 
                While we strive to provide only quality links to useful and ethical websites, we have no control 
                over the content and nature of these sites.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                These links to other websites do not imply a recommendation for all the content found on these sites. 
                Site owners and content may change without notice and may occur before we have the opportunity to 
                remove a link which may have gone 'bad'.
              </p>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-green-700">Important:</span> When you leave our website, 
                  other sites may have different privacy policies and terms which are beyond our control. 
                  Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" 
                  before engaging in any business or uploading any information.
                </p>
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Consent</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              By using our website, you hereby consent to our disclaimer and agree to its terms.
            </p>
          </div>

          {/* Updates Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              Should we update, amend or make any changes to this document, those changes will be prominently posted here.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;