import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Home, CreditCard, Receipt, FileText, History } from "lucide-react";

interface FormData {
  // Flat Details
  address: string;
  ownerName: string;
  ownerMobile: string;
  ownerEmail: string;
  propertyNo: string;
  documentNo: string;
  surveyNo: string;
  purchaseCost: string;
  brokerage: string;
  agreementPrice: string;

  // Loan Details
  cashPaid: string;
  loanAmount: string;
  roi: string;
  bankName: string;
  loanPlan: string;
  loanPaidTillDate: string;

  // Expenses
  maintenance: string;
  parkingTax: string;
  renovation: string;

  // Rental Details
  rentalAgreement: string;
  currentRent: string;
  duration: string;
  annualIncrement: string;

  // Previous Rental Income
  rentalHistory: string;
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Flat Details
    address: "",
    ownerName: "",
    ownerMobile: "",
    ownerEmail: "",
    propertyNo: "",
    documentNo: "",
    surveyNo: "",
    purchaseCost: "",
    brokerage: "",
    agreementPrice: "",

    // Loan Details
    cashPaid: "",
    loanAmount: "",
    roi: "",
    bankName: "",
    loanPlan: "",
    loanPaidTillDate: "",

    // Expenses
    maintenance: "",
    parkingTax: "",
    renovation: "",

    // Rental Details
    rentalAgreement: "",
    currentRent: "",
    duration: "",
    annualIncrement: "",

    // Previous Rental Income
    rentalHistory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Final Data:", formData);
    alert("Property onboarding completed successfully! 🎉");
  };

  const steps = [
    { number: 1, title: "Property Details", icon: Home },
    { number: 2, title: "Loan Information", icon: CreditCard },
    { number: 3, title: "Expenses", icon: Receipt },
    { number: 4, title: "Rental Details", icon: FileText },
    { number: 5, title: "Rental History", icon: History },
  ];

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = step === stepItem.number;
              const isCompleted = step > stepItem.number;
              
              return (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#00c853] to-[#00acc1] border-transparent text-white' 
                      : isCompleted 
                        ? 'bg-[#00c853] border-[#00c853] text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${isActive ? 'text-[#00c853]' : 'text-gray-500'}`}>
                      Step {stepItem.number}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {stepItem.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      hidden md:block w-16 h-0.5 ml-4 transition-colors duration-300
                      ${isCompleted ? 'bg-[#00c853]' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          className="bg-white shadow-xl rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-[#00c853] to-[#00acc1] px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Property Onboarding — Step {step} of 5
            </h2>
            <p className="text-white/90 text-center mt-2">
              {steps[step - 1].title}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step 1: Property Details */}
                {step === 1 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <Home className="w-5 h-5 mr-2 text-[#00c853]" />
                        Property Details
                      </h3>
                      <p className="text-gray-600">Enter the basic information about your property</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Address</label>
                        <input
                          name="address"
                          value={formData.address}
                          placeholder="Enter complete property address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name</label>
                        <input
                          name="ownerName"
                          value={formData.ownerName}
                          placeholder="Property owner's full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Mobile</label>
                        <input
                          name="ownerMobile"
                          value={formData.ownerMobile}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Email</label>
                        <input
                          name="ownerEmail"
                          type="email"
                          value={formData.ownerEmail}
                          placeholder="owner@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Number</label>
                        <input
                          name="propertyNo"
                          value={formData.propertyNo}
                          placeholder="Property identification number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Document Number</label>
                        <input
                          name="documentNo"
                          value={formData.documentNo}
                          placeholder="Legal document number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Survey Number</label>
                        <input
                          name="surveyNo"
                          value={formData.surveyNo}
                          placeholder="Government survey number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Purchase Cost (₹)</label>
                        <input
                          name="purchaseCost"
                          value={formData.purchaseCost}
                          placeholder="Total purchase amount"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Brokerage (₹)</label>
                        <input
                          name="brokerage"
                          value={formData.brokerage}
                          placeholder="Brokerage amount paid"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Agreement Price (₹)</label>
                        <input
                          name="agreementPrice"
                          value={formData.agreementPrice}
                          placeholder="Price mentioned in agreement"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Loan Details */}
                {step === 2 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-[#00c853]" />
                        Loan Information
                      </h3>
                      <p className="text-gray-600">Provide details about your property loan</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Amount Paid (₹)</label>
                        <input
                          name="cashPaid"
                          value={formData.cashPaid}
                          placeholder="Down payment amount"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (₹)</label>
                        <input
                          name="loanAmount"
                          value={formData.loanAmount}
                          placeholder="Total loan sanctioned"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rate of Interest (%)</label>
                        <input
                          name="roi"
                          value={formData.roi}
                          placeholder="Annual interest rate"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                        <input
                          name="bankName"
                          value={formData.bankName}
                          placeholder="Lending bank name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Plan Name</label>
                        <input
                          name="loanPlan"
                          value={formData.loanPlan}
                          placeholder="Home loan scheme name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Paid Till Date (₹)</label>
                        <input
                          name="loanPaidTillDate"
                          value={formData.loanPaidTillDate}
                          placeholder="Amount already repaid"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Expenses */}
                {step === 3 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <Receipt className="w-5 h-5 mr-2 text-[#00c853]" />
                        Property Expenses
                      </h3>
                      <p className="text-gray-600">Track your property-related expenses</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Maintenance Cost (per year)</label>
                        <input
                          name="maintenance"
                          value={formData.maintenance}
                          placeholder="Annual maintenance charges"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Parking Taxes</label>
                        <input
                          name="parkingTax"
                          value={formData.parkingTax}
                          placeholder="Parking-related taxes"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Renovation/Repair Expenses</label>
                        <input
                          name="renovation"
                          value={formData.renovation}
                          placeholder="Total renovation and repair costs"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4: Rental Details */}
                {step === 4 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-[#00c853]" />
                        Current Rental Details
                      </h3>
                      <p className="text-gray-600">Information about current rental agreement</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rental Agreement Period</label>
                        <input
                          name="rentalAgreement"
                          value={formData.rentalAgreement}
                          placeholder="e.g., 2024-2026"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Monthly Rent (₹)</label>
                        <input
                          name="currentRent"
                          value={formData.currentRent}
                          placeholder="Monthly rental amount"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Agreement Duration (months)</label>
                        <input
                          name="duration"
                          value={formData.duration}
                          placeholder="Total agreement duration"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Increment (%)</label>
                        <input
                          name="annualIncrement"
                          value={formData.annualIncrement}
                          placeholder="Yearly rent increase percentage"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 5: Previous Rental Income */}
                {step === 5 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <History className="w-5 h-5 mr-2 text-[#00c853]" />
                        Previous Rental History
                      </h3>
                      <p className="text-gray-600">Historical rental income information</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Rental Income History</label>
                      <textarea
                        name="rentalHistory"
                        value={formData.rentalHistory}
                        placeholder="Enter year-wise rental income details:&#10;&#10;2022: ₹15,000/month (Jan-Dec)&#10;2023: ₹16,000/month (Jan-Dec)&#10;2024: ₹17,000/month (Jan-present)&#10;&#10;Include any gaps, tenant changes, or special circumstances..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-colors resize-none"
                        rows={8}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-[#00c853] to-[#00acc1] text-white rounded-lg hover:from-[#00b248] hover:to-[#0097a7] transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Complete Onboarding
                </button>
              )}
            </div>
          </form>
        </motion.div>
        </div>
    </div>
  );
}