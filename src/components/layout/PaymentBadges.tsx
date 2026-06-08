import React from 'react';

export function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Visa */}
      <div className="bg-white h-8 w-14 rounded shadow-sm flex items-center justify-center border border-gray-200">
        <span className="text-[#1434CB] font-black italic text-sm tracking-tight">VISA</span>
      </div>
      
      {/* Mastercard */}
      <div className="bg-white h-8 w-14 rounded shadow-sm flex items-center justify-center border border-gray-200 overflow-hidden relative">
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-90 absolute left-[14px]"></div>
          <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90 absolute right-[14px] mix-blend-multiply"></div>
        </div>
      </div>
      
      {/* Apple Pay */}
      <div className="bg-white h-8 w-[72px] rounded shadow-sm flex items-center justify-center border border-gray-200 text-black">
        <img src="/img/Apple-Logo.png" alt="Apple" className="h-[20px] w-auto shrink-0 object-contain mb-[2px] mr-[-2px]" />
        <span className="font-semibold text-[15px] tracking-tight mb-[1px]">Pay</span>
      </div>
      
      {/* Google Pay */}
      <div className="bg-white h-8 w-[72px] rounded shadow-sm flex items-center justify-center border border-gray-200 gap-1 text-black">
        <svg className="w-3.5 h-3.5" viewBox="0 0 512 512">
          <path fill="#4285F4" d="M500 260c0-16-1-31-4-46H260v88h135c-6 29-23 53-47 69v57h76c45-41 71-102 71-168z"/>
          <path fill="#34A853" d="M260 504c67 0 124-22 165-60l-76-57c-22 15-51 24-89 24-68 0-126-46-147-108H35v59c41 82 126 142 225 142z"/>
          <path fill="#FBBC05" d="M113 303c-5-16-8-33-8-51s3-35 8-51v-59H35C13 186 0 218 0 252s13 66 35 110l78-59z"/>
          <path fill="#EA4335" d="M260 100c37 0 70 13 96 38l72-72C384 24 327 0 260 0 161 0 76 60 35 142l78 59c21-62 79-101 147-101z"/>
        </svg>
        <span className="font-semibold text-[13px] tracking-tight text-[#5F6368]">Pay</span>
      </div>
    </div>
  );
}
