import CountriesCard from "../../components/countriesCard";
import Filter from "../../components/filter";
import Input from "../../components/input";
import ContainerLayout from "../../components/layout/container-layout";
import { useGetCountries } from "../../hooks/useGetCountries";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner";
import ComponentVisibility from "../../components/componentVisibility";

const Home = () => {
  const { countries, loading } = useGetCountries();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [displayedCountries, setDisplayedCountries] = useState(
    countries.slice(0, 16)
  );
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const filteredCountries = countries.filter((country) => {
    const matchesSearchTerm = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion
      ? country.region === selectedRegion ||
        (selectedRegion === "America" && country.region === "Americas")
      : true;
    return matchesSearchTerm && matchesRegion;
  });

  useEffect(() => {
    setDisplayedCountries(filteredCountries.slice(0, page * 16));
    setHasMore(page * 16 < filteredCountries.length);
  }, [filteredCountries, page]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <ContainerLayout>
      <div className="flex flex-col sm:flex-row mb-12 justify-start md:justify-between md:items-center gap-10">
        <Input setSearchTerm={setSearchTerm} />
        <Filter setSelectedRegion={setSelectedRegion} />
      </div>
      <ComponentVisibility isVisible={loading}>
        <Spinner />
      </ComponentVisibility>
      <InfiniteScroll
        dataLength={displayedCountries.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[44px]">
          {displayedCountries.map((country, index) => (
            <CountriesCard country={country} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </ContainerLayout>
  );
};

export default Home;
