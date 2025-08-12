"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Key, Shield, CheckCircle } from "lucide-react";
import { otpSchema, OtpFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface OtpVerificationProps {
  phone: string;
  onVerify: (data: OtpFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function OtpVerification({
  phone,
  onVerify,
  onBack,
  isLoading,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isComplete, setIsComplete] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update form value
    setValue("otp", newOtp.join(""));

    // Check if OTP is complete
    if (newOtp.every((digit) => digit !== "")) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input if value is deleted
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
      setValue("otp", pastedData);
      setIsComplete(true);
    }
  };

  const onSubmit = (data: OtpFormData) => {
    onVerify(data);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Verify OTP
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {phone}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
            Enter OTP
          </label>

          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={cn(
                  "w-14 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 transition-all duration-200",
                  digit &&
                    "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg",
                  isComplete &&
                    digit &&
                    "border-green-600 bg-green-100 dark:bg-green-900/30 shadow-glow"
                )}
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-sm text-red-600 text-center animate-fade-in">
              {errors.otp.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !isComplete}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isComplete ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Key className="w-5 h-5" />
          )}
          <span className="font-semibold">
            {isLoading
              ? "Verifying..."
              : isComplete
              ? "Verify OTP"
              : "Enter 6-digit code"}
          </span>
        </button>
      </form>

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
            onClick={() => {
              // Resend OTP logic would go here
              console.log("Resend OTP");
            }}
          >
            Resend
          </button>
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Shield className="w-3 h-3" />
          <span>Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
}
