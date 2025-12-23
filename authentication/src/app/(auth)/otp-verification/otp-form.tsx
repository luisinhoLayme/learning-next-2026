'use client'

import Link from 'next/link';
import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent, Ref } from 'react';

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index:number, value:string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (!isNaN(Number(pastedData[i]))) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      alert(`Código OTP ingresado: ${otpValue}`);
    } else {
      alert('Por favor completa todos los dígitos');
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    alert('Código reenviado');
  };

  return (
    <div className="">
      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el:HTMLInputElement | null) => { inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-10 h-16 min-[390px]:w-12 min-[390px]:h-20 min-[440px]:w-14 text-center text-xl sm:text-2xl font-bold bg-graylight rounded-lg focus:ring-3 focus:ring-primary/30 focus:outline-none transition-all duration-200"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary/30 transition-all duration-200 mb-4"
      >
        Verify OTP Code
      </button>

      <div className="flex justify-center items-center gap-1">
        <p className="text-secondary text-sm">Didn't recive code?</p>
        <button
          onClick={handleResend}
          className="text-primary-variant hover:text-primary cursor-pointer transition-colors duration-200 text-sm"
        >
          Resend
        </button>
      </div>

      <div className="mt-2 flex gap-2 justify-center">
        <p className="text-sm text-secondary">Return to</p>
        <Link href="/sign-in" className="text-sm text-primary-variant hover:underline">Sign In</Link>
      </div>
    </div>
  );
}
