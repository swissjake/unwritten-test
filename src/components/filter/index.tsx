import { RxCaretDown } from "react-icons/rx";
import Dropdown from "../dropdown";
import ComponentVisibility from "../componentVisibility";
import { useState, useEffect } from "react";

const Filter = ({
  setSelectedRegion,
}: {
  setSelectedRegion: (region: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedContinent, setSelectedContinent] = useState<string>("");

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedRegion(continent);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          handleOpen();
          e.stopPropagation();
        }}
        className="relative w-[200px] h-[56px] bg-white text-[#111517] rounded-lg shadow-sm flex items-center justify-between gap-2 py-[18px] px-6"
      >
        {selectedContinent ? selectedContinent : " Filter by Region"}{" "}
        <RxCaretDown className="text-[#111517]" size={28} />
      </button>
      <ComponentVisibility isVisible={isOpen}>
        <Dropdown setSelectedContinent={handleContinentChange} />
      </ComponentVisibility>
    </div>
  );
};

export default Filter;
