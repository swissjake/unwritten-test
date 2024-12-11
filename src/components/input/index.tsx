import { IoIosSearch } from "react-icons/io";

const Input = ({
  setSearchTerm,
}: {
  setSearchTerm: (term: string) => void;
}) => {
  return (
    <div className="max-w-[480px]  w-full flex items-center rounded-md bg-white shadow-sm pl-2 overflow-hidden">
      <IoIosSearch className="text-gray-500" size={30} />
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full h-[56px]  px-4 outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Input;
