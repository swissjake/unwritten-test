import { Country } from "../../hooks/useGetCountries";

const CountriesCard = ({ country }: { country: Country }) => {
  return (
    <article
      className="w-full bg-white rounded-lg shadow-sm overflow-hidden"
      aria-labelledby="country-name"
    >
      <div className="mb-4">
        <div className="w-full h-[200px]">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
            loading="lazy"
            aria-describedby="flag-description"
          />
          <span id="flag-description" className="sr-only">
            National flag of {country.name.common}
          </span>
        </div>

        <div className="pl-6 pt-6 pb-10 space-y-2" role="contentinfo">
          <h2 id="country-name" className="text-[18px] font-bold" tabIndex={0}>
            {country.name.common}
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="inline">Population: </dt>
              <dd className="inline font-bold">
                {new Intl.NumberFormat().format(country.population)}
              </dd>
            </div>
            <div>
              <dt className="inline">Region: </dt>
              <dd className="inline font-bold">{country.region}</dd>
            </div>
            <div>
              <dt className="inline">Capital: </dt>
              <dd className="inline font-bold">{country.capital?.[0]}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
};

export default CountriesCard;
