import { Country } from "@/types";

// Define the structure of the API response
interface CountryApiResponse {
  name?: {
    common?: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  cca2?: string;
  flags?: {
    svg?: string;
  };
}

// Fetch countries from restcountries.com
export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/independent?status=true");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countries = await response.json();

    // Ensure countries is an array
    if (!Array.isArray(countries)) {
      console.warn("API returned non-array data, using fallback countries");
      throw new Error("Invalid API response format");
    }

    const processedCountries = countries
      .filter(
        (country: CountryApiResponse) =>
          country &&
          country.idd?.root &&
          country.idd?.suffixes &&
          Array.isArray(country.idd.suffixes) &&
          country.idd.suffixes.length > 0
      )
      .map((country: CountryApiResponse) => ({
        name: country.name?.common || "Unknown",
        dial_code: `+${country.idd!.root}${country.idd!.suffixes![0]}`,
        code: country.cca2 || "XX",
        flag: country.flags?.svg || "🏳️",
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

    // Ensure we have at least some countries
    if (processedCountries.length === 0) {
      throw new Error("No valid countries found in API response");
    }
    console.log(processedCountries);

    return processedCountries;
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
      { name: "Brazil", dial_code: "+55", code: "BR", flag: "🇧🇷" },
      { name: "Mexico", dial_code: "+52", code: "MX", flag: "🇲🇽" },
      { name: "South Korea", dial_code: "+82", code: "KR", flag: "🇰🇷" },
      { name: "Italy", dial_code: "+39", code: "IT", flag: "🇮🇹" },
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
