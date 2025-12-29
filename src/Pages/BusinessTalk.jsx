import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase"; // Firebase initialization file
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Mail, Phone } from "lucide-react";

const initialForm = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
  companyUrl: "",
  budget: "",
  categories: [],
  otherCategoryDetail: "",
  projectDetails: "",
};

const categoryOptions = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "E-commerce",
  "SaaS Product",
  "Other",
];

// Floating Input Component
const FloatingInput = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="relative w-full group">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full border-0 border-b border-gray-600 bg-transparent px-1 py-2 text-gray-100 outline-none focus:border-[#7ebad1] hover:border-[#7ebad1]"
    />
    <label
      className={`absolute left-1 text-gray-400 transition-all duration-200 
        peer-placeholder-shown:top-2 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-500 
        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#7ebad1]
        group-hover:-top-3 group-hover:text-sm group-hover:text-[#7ebad1]
        ${value ? "-top-3 text-sm text-[#7ebad1]" : "top-2"}`}
    >
      {label}
    </label>
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

// Floating Textarea Component
const FloatingTextarea = ({ label, name, value, onChange, error }) => (
  <div className="relative w-full group">
    <textarea
      name={name}
      rows="4"
      placeholder=" "
      value={value}
      onChange={onChange}
      className="peer w-full border-0 border-b border-gray-600 bg-transparent px-1 py-2 text-gray-100 outline-none resize-none focus:border-[#7ebad1] hover:border-[#7ebad1]"
    ></textarea>
    <label
      className={`absolute left-1 text-gray-400 transition-all duration-200 
        peer-placeholder-shown:top-2 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-500 
        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#7ebad1]
        group-hover:-top-3 group-hover:text-sm group-hover:text-[#7ebad1]
        ${value ? "-top-3 text-sm text-[#7ebad1]" : "top-2"}`}
    >
      {label}
    </label>
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

const BusinessTalk = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.companyName.trim()) newErrors.companyName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Required";
    } else if (formData.phoneNumber.replace(/\D/g, "").length < 10) {
      newErrors.phoneNumber = "Invalid number";
    }
    if (formData.categories.length === 0) newErrors.categories = "Select at least one";
    if (formData.categories.includes("Other") && !formData.otherCategoryDetail.trim())
      newErrors.otherCategoryDetail = "Required";
    if (!formData.projectDetails.trim()) newErrors.projectDetails = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "categories") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((c) => c !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "businessInquiries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSuccessMessage("Inquiry submitted successfully!");
      setFormData(initialForm);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Firebase Error:", error);
      setSuccessMessage("Something went wrong. Try again.");
      setTimeout(() => setSuccessMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <section className="relative min-h-screen w-full bg-[#000000] flex items-center justify-center py-20 px-4 sm:px-8 lg:px-16 overflow-hidden" id="business">
      
      <div className="relative z-10 w-full max-w-8xl mx-auto bg-[#0f1a1c] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-700">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-5/12 bg-[#0f1a1c] p-10 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-700">
          <div>
            <h2 className="text-4xl md:text-5xl 2xl:text-7xl font-bold mb-6 text-white leading-tight">
              Ready to Work <br /> With Us?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Complete the form to arrange a complimentary{" "}
              <span className="font-semibold text-white">
                30-minute discovery session
              </span>{" "}
              where we analyze your concept, provide early guidance, and outline
              actionable next steps.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-700">
            <p className="text-white font-semibold text-lg 2xl:text-3xl mb-3">
              Contact Information
            </p>
            <div className="space-y-3 text-gray-400 text-base 2xl:text-lg">
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7ebad1]" />
                <span>info@webaurix.com</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7ebad1]" />
                <span>+92 322 7831753</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7ebad1]" />
                <span>+92 332 4835793</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full lg:w-7/12 bg-[#1a2528] p-10 lg:p-16 text-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg text-center text-white ${
                    successMessage.includes("") ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Names */}
            <div className="flex flex-col md:flex-row gap-4">
              <FloatingInput
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <FloatingInput
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>

            <FloatingInput
              label="Company Name *"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
            />

            <FloatingInput
              label="Company URL (Optional)"
              name="companyUrl"
              value={formData.companyUrl}
              onChange={handleChange}
              placeholder="https://example.com"
            />

            <FloatingInput
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* Phone Input */}
            <div>
              <label className="block mb-1 font-medium text-gray-300">
                Contact Number *
              </label>
              <PhoneInput
                country={"pk"}
                value={formData.phoneNumber}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phoneNumber: value }))
                }
                containerClass="w-full"
                inputClass="!w-full !bg-transparent !text-white !border-0 !border-b !border-gray-600 !rounded-none !pl-14 !py-2 focus:!border-[#7ebad1] hover:!border-[#7ebad1] !outline-none placeholder-gray-400"
                buttonClass="!bg-transparent !border-none !hover:bg-[#1]"
                dropdownClass="!bg-[#1a2528] !text-white !border !border-gray-700 custom-scrollbar"
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            <FloatingInput
              label="Budget (Optional)"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />

            {/* Categories */}
            <div>
              <p className="font-medium text-gray-300 mb-2">
                Project Category *
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryOptions.map((category, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-gray-300">
                    <input
                      type="checkbox"
                      name="categories"
                      value={category}
                      checked={formData.categories.includes(category)}
                      onChange={handleChange}
                      className="accent-[#7ebad1]"
                    />
                    {category}
                  </label>
                ))}
              </div>
              {errors.categories && (
                <p className="text-red-400 text-sm">{errors.categories}</p>
              )}

              <AnimatePresence>
                {formData.categories.includes("Other") && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3"
                  >
                    <FloatingInput
                      label="Please Specify *"
                      name="otherCategoryDetail"
                      value={formData.otherCategoryDetail}
                      onChange={handleChange}
                      error={errors.otherCategoryDetail}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <FloatingTextarea
              label="Project Details *"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              error={errors.projectDetails}
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="border-2 border-[#7ebad1] text-[#7ebad1] px-10 py-2 rounded-lg font-medium hover:bg-[#034955] hover:text-white transition-all duration-300 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BusinessTalk;
