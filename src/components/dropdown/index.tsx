const continents = ["Africa", "America", "Asia", "Europe", "Oceania"];

interface DropdownProps {
  setSelectedContinent: (continent: string) => void;
}

const Dropdown = ({ setSelectedContinent }: DropdownProps) => {
  return (
    <div className="w-[200px] bg-white mt-1 absolute rounded-lg shadow-sm">
      {continents.map((continent) => (
        <div
          className=" hover:bg-gray-100 py-3 px-6 cursor-pointer"
          key={continent}
          onClick={() => setSelectedContinent(continent)}
        >
          {continent}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
