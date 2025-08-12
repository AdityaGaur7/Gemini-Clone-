import { Country } from "@/types";

// Fetch countries from restcountries.com
export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    
    return countries
      .filter((country: any) => country.idd?.root && country.idd?.suffixes)
      .map((country: any) => ({
        name: country.name.common,
        dial_code: `+${country.idd.root}${country.idd.suffixes[0]}`,
        code: country.cca2,
        flag: country.flags.svg,
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching countries:", error);
    // Fallback to some common countries
    return [
      { name: "United States", dial_code: "+1", code: "US", flag: "🇺🇸" },
      { name: "United Kingdom", dial_code: "+44", code: "GB", flag: "🇬🇧" },
      { name: "India", dial_code: "+91", code: "IN", flag: "🇮🇳" },
      { name: "Canada", dial_code: "+1", code: "CA", flag: "🇨🇦" },
      { name: "Australia", dial_code: "+61", code: "AU", flag: "🇦🇺" },
      { name: "Germany", dial_code: "+49", code: "DE", flag: "🇩🇪" },
      { name: "France", dial_code: "+33", code: "FR", flag: "🇫🇷" },
      { name: "Japan", dial_code: "+81", code: "JP", flag: "🇯🇵" },
    ];
  }
}

// Simulate OTP sending
export function sendOTP(phone: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`OTP sent to ${phone}`);
      resolve(true);
    }, 1000);
  });
}

// Simulate OTP verification
export function verifyOTP(otp: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, accept any 6-digit OTP
      const isValid = /^\d{6}$/.test(otp);
      resolve(isValid);
    }, 1000);
  });
}

