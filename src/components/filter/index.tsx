import { RxCaretDown } from "react-icons/rx";
import Dropdown from "../dropdown";
import ComponentVisibility from "../componentVisibility";
import { useState, useEffect, useCallback } from "react";

const Filter = ({
  setSelectedRegion,
}: {
  setSelectedRegion: (region: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedContinent, setSelectedContinent] = useState<string>("");

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedRegion(continent);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="relative w-[200px] h-[56px] bg-white text-[#111517] rounded-lg shadow-sm flex items-center justify-between gap-2 py-[18px] px-6"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="continent-dropdown"
      >
        {selectedContinent || "Filter by Region"}
        <RxCaretDown className="text-[#111517]" size={28} aria-hidden="true" />
      </button>
      <ComponentVisibility isVisible={isOpen}>
        <Dropdown
          setSelectedContinent={handleContinentChange}
          selectedContinent={selectedContinent}
        />
      </ComponentVisibility>
    </div>
  );
};

export default Filter;
