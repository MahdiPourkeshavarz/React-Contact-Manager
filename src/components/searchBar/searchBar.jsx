import { useContext } from "react";
import { ContactContext } from "../../contactContext";

export function SearchBar() {
  const { searchValue, onSearch } = useContext(ContactContext);

  return (
    <>
      <input
        className="border-none focus:outline-none h-8 w-80 rounded-2xl text-black text-center my-8"
        type="text"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search People"
      />
    </>
  );
}
