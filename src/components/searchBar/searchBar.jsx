import { useContext } from "react";
import { ContactContext } from "../../contactContext";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar() {
  const { onSearch } = useContext(ContactContext);

  const debounced = useDebouncedCallback(

    (value) => {
      onSearch(value);
    },

    1000
  );

  return (
    <>
      <input
        className="border focus:outline-none h-12 w-80 rounded-2xl text-black text-center my-8 w-1/2 focus:border-purple-700"
        type="text"
        onChange={(e) => debounced(e.target.value)}
        placeholder="جستجو کنید"
      />
    </>
  );
}
