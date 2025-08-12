"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Phone, Sparkles } from "lucide-react";
import { phoneSchema, PhoneFormData } from "@/lib/validations";
import { fetchCountries } from "@/lib/api";
import { Country } from "@/types";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  onSubmit: (data: PhoneFormData) => void;
  isLoading?: boolean;
}

export default function PhoneInput({ onSubmit, isLoading }: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const watchedCountryCode = watch("countryCode");

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
        if (countriesData.length > 0) {
          setSelectedCountry(countriesData[0]);
          setValue("countryCode", countriesData[0].dial_code);
        }
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    loadCountries();
  }, [setValue]);

  useEffect(() => {
    const country = countries.find((c) => c.dial_code === watchedCountryCode);
    setSelectedCountry(country || null);
  }, [watchedCountryCode, countries]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setValue("countryCode", country.dial_code);
    setShowCountryDropdown(false);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Gemini Clone
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Enter your phone number to get started
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Phone Number
          </label>

          <div className="flex group">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 border border-r-0 rounded-l-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700",
                  errors.countryCode && "border-red-500 focus:ring-red-500",
                  "group-hover:border-blue-400 dark:group-hover:border-blue-400"
                )}
                disabled={isLoadingCountries}
              >
                {selectedCountry ? (
                  <>
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedCountry.dial_code}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Loading...</span>
                )}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    showCountryDropdown && "rotate-180"
                  )}
                />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full left-0 z-20 w-72 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-2xl backdrop-blur-lg animate-fade-in">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white">
                        {country.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {country.dial_code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              type="tel"
              placeholder="Enter phone number"
              className={cn(
                "flex-1 px-4 py-3 border border-l-0 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 input-focus",
                errors.phone && "border-red-500 focus:ring-red-500",
                "group-hover:border-blue-400 dark:group-hover:border-blue-400"
              )}
              {...register("phone")}
            />
          </div>

          {errors.countryCode && (
            <p className="text-sm text-red-600 animate-fade-in">
              {errors.countryCode.message}
            </p>
          )}
          {errors.phone && (
            <p className="text-sm text-red-600 animate-fade-in">
              {errors.phone.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isLoadingCountries}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Phone className="w-5 h-5" />
          <span className="font-semibold">
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </span>
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
