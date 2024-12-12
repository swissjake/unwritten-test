import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CountriesCard from "./index";
import { Country } from "../../hooks/useGetCountries";

describe("CountriesCard", () => {
  const mockCountry: Country = {
    name: {
      common: "Brazil",
      official: "Federative Republic of Brazil",
    },
    population: 214000000,
    region: "Americas",
    capital: ["Brasília"],
    flags: {
      png: "https://example.com/flag.png",
      svg: "https://example.com/flag.svg",
      common: "Flag of Brazil",
    },
  };

  describe("content rendering", () => {
    it("renders country information correctly", () => {
      render(<CountriesCard country={mockCountry} />);

      expect(
        screen.getByRole("heading", { name: "Brazil" })
      ).toBeInTheDocument();
      expect(screen.getByText("Population:")).toBeInTheDocument();
      expect(screen.getByText("214,000,000")).toBeInTheDocument();
      expect(screen.getByText("Region:")).toBeInTheDocument();
      expect(screen.getByText("Americas")).toBeInTheDocument();
      expect(screen.getByText("Capital:")).toBeInTheDocument();
      expect(screen.getByText("Brasília")).toBeInTheDocument();
    });

    it("handles missing capital", () => {
      const countryWithoutCapital: Country = {
        ...mockCountry,
        capital: undefined,
      };
      render(<CountriesCard country={countryWithoutCapital} />);
      expect(screen.getByText("Capital:")).toBeInTheDocument();
      expect(screen.queryByText("Brasília")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("uses semantic HTML structure", () => {
      render(<CountriesCard country={mockCountry} />);

      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("article")).toHaveAttribute(
        "aria-labelledby",
        "country-name"
      );
    });

    it("provides accessible image with proper attributes", () => {
      render(<CountriesCard country={mockCountry} />);
      const flagImage = screen.getByRole("img");

      expect(flagImage).toBeInTheDocument();
      expect(flagImage).toHaveAttribute("src", "https://example.com/flag.png");
      expect(flagImage).toHaveAttribute("alt", `Flag of Brazil`);
      expect(flagImage).toHaveAttribute("loading", "lazy");
      expect(flagImage).toHaveAttribute("aria-describedby", "flag-description");
      expect(flagImage).toHaveClass("w-full", "h-full", "object-cover");
    });

    it("provides proper description for the flag", () => {
      render(<CountriesCard country={mockCountry} />);

      const flagDescription = screen.getByText("National flag of Brazil");
      expect(flagDescription).toHaveClass("sr-only");
      expect(flagDescription).toHaveAttribute("id", "flag-description");
    });

    it("uses definition list for country details", () => {
      render(<CountriesCard country={mockCountry} />);

      const terms = screen.getAllByRole("term");
      const definitions = screen.getAllByRole("definition");

      expect(terms).toHaveLength(3);
      expect(definitions).toHaveLength(3);
    });

    it("formats numbers for better readability", () => {
      render(<CountriesCard country={mockCountry} />);

      expect(screen.getByText("214,000,000")).toBeInTheDocument();
    });
  });
});
