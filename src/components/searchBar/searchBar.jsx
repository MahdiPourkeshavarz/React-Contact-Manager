import { useContext } from "react";
import { ContactContext } from "../../contactContext";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar() {
  const { onSearch } = useContext(ContactContext);

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      onSearch(value);
    },
    // delay in ms
    1000
  );

  return (
    <>
      <input
        className="border-none focus:outline-none h-8 w-80 rounded-2xl text-black text-center my-8"
        type="text"
        onChange={(e) => debounced(e.target.value)}
        placeholder="Search People"
      />
    </>
  );
}
