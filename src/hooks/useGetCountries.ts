import { useState, useEffect } from "react";

export interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
    common: string;
  };
}

export const useGetCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setCountries(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, loading, error };
};
