const continents = ["Africa", "America", "Asia", "Europe", "Oceania"];

interface DropdownProps {
  setSelectedContinent: (continent: string) => void;
  selectedContinent?: string;
}

const Dropdown = ({
  setSelectedContinent,
  selectedContinent,
}: DropdownProps) => {
  const handleKeyDown = (e: React.KeyboardEvent, continent: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedContinent(continent);
    }
  };

  return (
    <div
      className="w-[200px] bg-white mt-1 absolute z-20 rounded-lg shadow-sm"
      role="listbox"
      aria-label="Select a continent"
    >
      {continents.map((continent) => (
        <div
          role="option"
          aria-selected={selectedContinent === continent}
          tabIndex={0}
          className="hover:bg-gray-100 py-3 px-6 cursor-pointer focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500"
          key={continent}
          onClick={() => setSelectedContinent(continent)}
          onKeyDown={(e) => handleKeyDown(e, continent)}
        >
          {continent}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
