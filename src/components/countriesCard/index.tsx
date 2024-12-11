import { Country } from "../../hooks/useGetCountries";

const CountriesCard = ({ country }: { country: Country }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="mb-4">
        <div className="w-full h-[160px]">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="pl-6 pt-6 pb-10 space-y-2">
          <p className="text-[18px] font-bold">{country.name.common}</p>
          <p>
            Population: <span className="font-bold">{country.population}</span>
          </p>
          <p>
            Region: <span className="font-bold">{country.region}</span>
          </p>
          <p>
            Capital: <span className="font-bold">{country.capital?.[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountriesCard;
