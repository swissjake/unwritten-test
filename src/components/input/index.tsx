import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";

const Input = ({
  setSearchTerm,
}: {
  setSearchTerm: (term: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  // Debounce function
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchTerm]);

  return (
    <div className="max-w-[480px] w-full flex items-center rounded-md bg-white shadow-sm pl-2 overflow-hidden">
      <IoIosSearch className="text-gray-500" size={30} />
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full h-[56px] px-4 outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
