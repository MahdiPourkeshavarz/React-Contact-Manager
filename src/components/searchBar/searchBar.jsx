import { useContext } from "react";
import { ContactContext } from "../../contactContext";

export function SearchBar() {
  const { searchValue, onSearch } = useContext(ContactContext);

  function setSearchValue(value) {
    onSearch(value);
  }

  return (
    <>
      <input
        className="border-none focus:outline-none h-8 w-80 rounded-2xl text-black text-center my-8"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search People"
      />
    </>
  );
}
