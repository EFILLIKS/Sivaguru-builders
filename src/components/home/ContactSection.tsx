"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { createEnquiry } from "@/lib/repositories/enquiries";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Framer Motion Variants for staggering the form fields
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("General Inquiry");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter your message or project details.");
      return;
    }

    setSubmitting(true);

    try {
      await createEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        message: message.trim(),
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setService("General Inquiry");

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col items-center bg-[#FFFAFA] w-full pt-[100px] px-5 pb-[50px] z-10">
      {/* Main Container Image/Background Box */}
      <div className="relative flex flex-col lg:flex-row justify-between items-end p-5 lg:p-5 gap-[30px] w-full max-w-[1400px] min-h-[700px] rounded-[20px] overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/house-image.jpg" 
            alt="Modern house at dusk" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Left Side: Glassmorphism Text Block */}
        <div className="relative z-10 flex flex-col items-start p-5 gap-5 w-full lg:w-[550px] bg-black/50 backdrop-blur-[7.5px] rounded-[12.5px] mt-auto">
          <h2 className="text-[28px] md:text-[34px] leading-[36px] md:leading-[42px] uppercase text-white font-normal">
            <span className="lang-en">Have a Questions in mind?</span>
            <span className="lang-ta">மனதில் ஏதேனும் கேள்விகள் உள்ளதா?</span>
          </h2>
          
          <div className="flex flex-col items-start gap-[10px] w-full">
            <h3 className="text-[20px] md:text-[24px] leading-[30px] text-[#FFE2C4] font-medium tracking-[0.7px]">
              <span className="lang-en">Let's talk about it.</span>
              <span className="lang-ta">அதைப் பற்றி பேசுவோம்.</span>
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[20px] text-[#FFE2C4] font-extralight tracking-[0.7px]">
              <span className="lang-en">
                Share your project requirements with us. Whether it's a new home, commercial space, interior transformation, or reconstruction, we'll help you plan the next step.
              </span>
              <span className="lang-ta">
                உங்கள் திட்டத் தேவைகளை எங்களுடன் பகிர்ந்து கொள்ளுங்கள். புதிய வீடு, வணிக இடம், உள் வடிவமைப்பு மாற்றம் அல்லது மறுசீரமைப்பு எதுவாக இருந்தாலும், அடுத்த படியைத் திட்டமிட நாங்கள் உதவுவோம்.
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Form Block */}
        <motion.form 
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 flex flex-col items-start p-6 md:p-8 gap-5 w-full lg:max-w-[500px] bg-white rounded-[12.5px] shadow-lg"
        >
          {/* Form Header */}
          <motion.div variants={itemVariants} className="flex flex-col w-full gap-2">
            <h2 className="text-[26px] md:text-[34px] leading-[32px] md:leading-[42px] text-black font-normal">
              <span className="lang-en">Tell us a little about what you're planning to build.</span>
              <span className="lang-ta">நீங்கள் என்ன கட்ட திட்டமிட்டுள்ளீர்கள் என்பதைப் பற்றி கொஞ்சம் கூறுங்கள்.</span>
            </h2>
            <p className="text-[16px] md:text-[20px] leading-[25px] text-black/50 font-normal">
              <span className="lang-en">Please fill all the Details.</span>
              <span className="lang-ta">அனைத்து விவரங்களையும் நிரப்பவும்.</span>
            </p>
          </motion.div>

          {/* Feedback Alerts */}
          {success && (
            <motion.div variants={itemVariants} className="w-full p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="lang-en">Thank you! Your message has been sent successfully.</span>
              <span className="lang-ta">நன்றி! உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது.</span>
            </motion.div>
          )}

          {error && (
            <motion.div variants={itemVariants} className="w-full p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form Fields */}
          <div className="flex flex-col gap-[15px] w-full mt-2">
            {/* Full Name Field */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-[10px] w-full">
              <label className="text-[14px] md:text-[16px] leading-[20px] font-light text-black/50">
                <span className="lang-en">Full Name</span>
                <span className="lang-ta">முழு பெயர்</span>
              </label>
              <div className="flex flex-row items-center p-[5px] pl-[10px] gap-[10px] w-full h-[46px] bg-[#F47920]/5 border border-[#F47920] rounded-[7.8px]">
                <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 15C19.2091 15 21 13.2091 21 11C21 8.79086 19.2091 7 17 7C14.7909 7 13 8.79086 13 11C13 13.2091 14.7909 15 17 15Z" fill="#F47920"/>
                    <path d="M25 22.5C25 24.985 25 27 17 27C9 27 9 24.985 9 22.5C9 20.015 12.582 18 17 18C21.418 18 25 20.015 25 22.5Z" fill="#F47920"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[16px] leading-[20px] text-black placeholder:text-[#DCDCDC]"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-[10px] w-full">
              <label className="text-[14px] md:text-[16px] leading-[20px] font-light text-black/50">
                <span className="lang-en">Email</span>
                <span className="lang-ta">மின்னஞ்சல்</span>
              </label>
              <div className="flex flex-row items-center p-[5px] pl-[10px] gap-[10px] w-full h-[46px] bg-[#F47920]/5 border border-[#F47920] rounded-[7.8px]">
                <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 26.9998H19C22.771 26.9998 24.657 26.9998 25.828 25.8288C26.999 24.6578 27 22.7698 27 18.9998C27 15.2298 27 13.3428 25.828 12.1718C25.466 11.8088 25.034 11.5588 24.5 11.3858V14.1588C24.503 14.4988 24.509 15.0698 24.264 15.5918C24.02 16.1138 23.578 16.4758 23.314 16.6918C23.2873 16.7118 23.263 16.7318 23.241 16.7518L21.734 18.0068C20.874 18.7248 20.124 19.3488 19.45 19.7828C18.725 20.2488 17.94 20.5948 17 20.5948C16.06 20.5948 15.276 20.2488 14.55 19.7828C13.876 19.3488 13.127 18.7248 12.266 18.0078L10.759 16.7518L10.686 16.6918C10.422 16.4758 9.981 16.1138 9.736 15.5918C9.492 15.0698 9.496 14.4988 9.499 14.1588L9.5 14.0628V11.3848C8.966 11.5578 8.534 11.8088 8.172 12.1718C7 13.3428 7 15.2288 7 18.9998C7 22.7708 7 24.6568 8.172 25.8288C9.344 27.0008 11.229 26.9998 15 26.9998Z" fill="#F47920"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.72 15.6L13.159 16.8C14.996 18.33 15.914 19.095 17 19.095C18.086 19.095 19.005 18.33 20.841 16.799L22.281 15.599C22.634 15.305 22.811 15.157 22.906 14.956C23 14.754 23 14.524 23 14.063V12C23 11.68 22.9994 11.3807 22.998 11.102C22.986 9.331 22.9 8.365 22.268 7.732C21.536 7 20.358 7 18 7H16C13.643 7 12.465 7 11.732 7.732C11.1 8.365 11.012 9.331 11 11.102C10.9987 11.38 10.9987 11.6793 11 12V14.063C11 14.523 11 14.754 11.095 14.956C11.189 15.157 11.365 15.305 11.72 15.6ZM14.25 11C14.25 10.8011 14.329 10.6103 14.4697 10.4697C14.6103 10.329 14.8011 10.25 15 10.25H19C19.1989 10.25 19.3897 10.329 19.5304 10.4697C19.671 10.6103 19.75 10.8011 19.75 11C19.75 11.1989 19.671 11.3897 19.5304 11.5303C19.3897 11.671 19.1989 11.75 19 11.75H15C14.8011 11.75 14.6103 11.671 14.4697 11.5303C14.329 11.3897 14.25 11.1989 14.25 11ZM15.25 14C15.25 13.8011 15.329 13.6103 15.4697 13.4697C15.6103 13.329 15.8011 13.25 16 13.25H18C18.1989 13.25 18.3897 13.329 18.5304 13.4697C18.671 13.6103 18.75 13.8011 18.75 14C18.75 14.1989 18.671 14.3897 18.5304 14.5303C18.3897 14.671 18.1989 14.75 18 14.75H16C15.8011 14.75 15.6103 14.671 15.4697 14.5303C15.329 14.3897 15.25 14.1989 15.25 14Z" fill="#F47920"/>
                  </svg>
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="your@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[16px] leading-[20px] text-black placeholder:text-[#DCDCDC]"
                />
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-[10px] w-full">
              <label className="text-[14px] md:text-[16px] leading-[20px] font-light text-black/50">
                <span className="lang-en">Phone.no</span>
                <span className="lang-ta">தொலைபேசி எண்</span>
              </label>
              <div className="flex flex-row items-center p-[5px] pl-[10px] gap-[10px] w-full h-[46px] bg-[#F47920]/5 border border-[#F47920] rounded-[7.8px]">
                <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.052 7H16.948C15.268 7 13.938 7 12.896 7.142C11.824 7.289 10.956 7.598 10.272 8.294C9.588 8.99 9.284 9.874 9.14 10.964C9 12.024 9 13.378 9 15.087V18.913C9 20.623 9 21.977 9.14 23.036C9.284 24.126 9.588 25.01 10.272 25.706C10.956 26.402 11.824 26.711 12.896 26.858C13.937 27 15.268 27 16.948 27H17.052C18.732 27 20.062 27 21.104 26.858C22.176 26.711 23.044 26.402 23.728 25.706C24.412 25.01 24.716 24.126 24.86 23.036C25 21.976 25 20.622 25 18.913V15.087C25 13.377 25 12.023 24.86 10.964C24.716 9.874 24.412 8.99 23.728 8.294C23.044 7.598 22.176 7.289 21.104 7.142C20.063 7 18.732 7 17.052 7ZM13.572 23.512C13.5709 23.4211 13.5878 23.331 13.6217 23.2466C13.6556 23.1623 13.7058 23.0855 13.7695 23.0207C13.8331 22.9558 13.909 22.9042 13.9926 22.8687C14.0763 22.8332 14.1661 22.8147 14.257 22.814H19.743C20.122 22.814 20.429 23.126 20.429 23.512C20.4299 23.6029 20.4129 23.693 20.3789 23.7773C20.3449 23.8615 20.2945 23.9383 20.2308 24.003C20.1671 24.0678 20.0912 24.1193 20.0074 24.1547C19.9237 24.19 19.8339 24.2085 19.743 24.209H14.257C14.1661 24.2085 14.0763 24.19 13.9926 24.1547C13.9088 24.1193 13.8329 24.0678 13.7692 24.003C13.7055 23.9383 13.6551 23.8615 13.6211 23.7773C13.5871 23.693 13.5711 23.6029 13.572 23.512Z" fill="#F47920"/>
                  </svg>
                </div>
                <input 
                  type="tel" 
                  required
                  placeholder="Your Phone number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[16px] leading-[20px] text-black placeholder:text-[#DCDCDC]"
                />
              </div>
            </motion.div>

            {/* Service Selection */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-[10px] w-full">
              <label className="text-[14px] md:text-[16px] leading-[20px] font-light text-black/50">
                <span className="lang-en">Interested Service</span>
                <span className="lang-ta">ஆர்வமுள்ள சேவை</span>
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full h-[46px] px-3 bg-[#F47920]/5 border border-[#F47920] rounded-[7.8px] text-[16px] text-black outline-none cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Residential Construction">Residential Construction</option>
                <option value="Commercial Construction">Commercial Construction</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Reconstruction">Reconstruction</option>
              </select>
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-[10px] w-full">
              <label className="text-[14px] md:text-[16px] leading-[20px] font-light text-black/50">
                <span className="lang-en">Message</span>
                <span className="lang-ta">செய்தி</span>
              </label>
              <div className="flex flex-row items-start p-[5px] pl-[10px] pt-[10px] gap-[10px] w-full h-[100px] bg-[#F47920]/5 border border-[#F47920] rounded-[7.8px]">
                <div className="flex-shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.629 25.472L18.087 26.388C17.604 27.204 16.397 27.204 15.913 26.388L15.371 25.472C14.951 24.762 14.741 24.406 14.403 24.21C14.065 24.013 13.64 24.006 12.79 23.991C11.534 23.97 10.747 23.893 10.087 23.619C9.48037 23.3677 8.92917 22.9994 8.46487 22.5351C8.00057 22.0708 7.63227 21.5196 7.381 20.913C7 19.995 7 18.83 7 16.5V15.5C7 12.227 7 10.59 7.737 9.388C8.14904 8.7152 8.71445 8.14945 9.387 7.737C10.59 7 12.228 7 15.5 7H18.5C21.773 7 23.41 7 24.613 7.737C25.2854 8.14917 25.8508 8.71456 26.263 9.387C27 10.59 27 12.228 27 15.5V16.5C27 18.83 27 19.995 26.62 20.913C26.3686 21.5197 26.0002 22.071 25.5357 22.5353C25.0712 22.9996 24.5198 23.3678 23.913 23.619C23.253 23.893 22.466 23.969 21.21 23.991C20.36 24.006 19.935 24.013 19.597 24.21C19.259 24.406 19.049 24.761 18.629 25.472ZM13 16.75C12.8011 16.75 12.6103 16.829 12.4697 16.9697C12.329 17.1103 12.25 17.3011 12.25 17.5C12.25 17.6989 12.329 17.8897 12.4697 18.0303C12.6103 18.171 12.8011 18.25 13 18.25H18.5C18.6989 18.25 18.8897 18.171 19.0303 18.0303C19.171 17.8897 19.25 17.6989 19.25 17.5C19.25 17.3011 19.171 17.1103 19.0303 16.9697C18.8897 16.829 18.6989 16.75 18.5 16.75H13ZM12.25 14C12.25 13.8011 12.329 13.6103 12.4697 13.4697C12.6103 13.329 12.8011 13.25 13 13.25H21C21.1989 13.25 21.3897 13.329 21.5303 14.5303C21.3897 14.671 21.1989 14.75 21 14.75H13C12.8011 14.75 12.6103 14.671 12.4697 14.5303C12.329 14.3897 12.25 14.1989 12.25 14Z" fill="#F47920"/>
                  </svg>
                </div>
                <textarea 
                  required
                  placeholder="Tell us about your project..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[16px] leading-[20px] text-black placeholder:text-[#DCDCDC] resize-none h-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="w-full mt-4">
            <Button type="submit" disabled={submitting} theme="light" className="w-full cursor-pointer">
              <span className="lang-en">{submitting ? "SENDING..." : "SEND"}</span>
              <span className="lang-ta">{submitting ? "அனுப்பப்படுகிறது..." : "அனுப்பு"}</span>
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
