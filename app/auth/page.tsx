"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PhoneInput from "@/components/auth/PhoneInput";
import OtpVerification from "@/components/auth/OtpVerification";
import { PhoneFormData, OtpFormData } from "@/lib/validations";
import { sendOTP, verifyOTP } from "@/lib/api";
import { useStore } from "@/store/useStore";

export default function AuthPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneData, setPhoneData] = useState<PhoneFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { setUser, setAuthLoading } = useStore();

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    setAuthLoading(true);

    try {
      const success = await sendOTP(`${data.countryCode}${data.phone}`);

      if (success) {
        setPhoneData(data);
        setStep("otp");
        toast.success("OTP sent successfully!");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setAuthLoading(false);
    }
  };

  const handleOtpVerify = async (data: OtpFormData) => {
    setIsLoading(true);
    setAuthLoading(true);

    try {
      const isValid = await verifyOTP(data.otp);

      if (isValid && phoneData) {
        // Create user object
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          phone: `${phoneData.countryCode}${phoneData.phone}`,
          countryCode: phoneData.countryCode,
        };

        setUser(user);
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setAuthLoading(false);
    }
  };

  const handleBack = () => {
    setStep("phone");
    setPhoneData(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass rounded-2xl p-8 shadow-2xl backdrop-blur-lg border border-white/20 dark:border-gray-700/50">
          {step === "phone" ? (
            <PhoneInput onSubmit={handlePhoneSubmit} isLoading={isLoading} />
          ) : (
            <OtpVerification
              phone={
                phoneData ? `${phoneData.countryCode}${phoneData.phone}` : ""
              }
              onVerify={handleOtpVerify}
              onBack={handleBack}
              isLoading={isLoading}
            />
          )}
        </div>

        
      </div>
    </div>
  );
}
