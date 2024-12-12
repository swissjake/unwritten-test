import CountriesCard from "../../components/countriesCard";
import Filter from "../../components/filter";
import Input from "../../components/input";
import ContainerLayout from "../../components/layout/container-layout";
import { useGetCountries } from "../../hooks/useGetCountries";
import { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner";

const ITEMS_PER_PAGE = 16;

const Home = () => {
  const { countries, loading } = useGetCountries();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Memoize filtered countries to prevent unnecessary recalculations
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearchTerm = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion
        ? country.region === selectedRegion ||
          (selectedRegion === "America" && country.region === "Americas")
        : true;
      return matchesSearchTerm && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  // Memoize displayed countries
  const displayedCountries = useMemo(() => {
    return filteredCountries.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredCountries, page]);

  const hasMore = displayedCountries.length < filteredCountries.length;

  // Reset page when search term or region changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedRegion]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <ContainerLayout>
      <div
        className="flex flex-col sm:flex-row mb-12 justify-start md:justify-between md:items-center gap-10"
        role="search"
        aria-label="Country search and filter"
      >
        <Input setSearchTerm={setSearchTerm} />
        <Filter setSelectedRegion={setSelectedRegion} />
      </div>
      {loading ? (
        <div
          role="status"
          aria-label="Loading countries"
          className="flex justify-center items-center "
        >
          <Spinner />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayedCountries.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={"Loading..."}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[44px]"
            role="region"
            aria-label="Countries grid"
          >
            {displayedCountries.map((country) => (
              <CountriesCard country={country} key={country.name.common} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </ContainerLayout>
  );
};

export default Home;
