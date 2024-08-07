import { useContext } from "react";
import { ContactContext } from "../../contactContext";


export function Pagination() {
  const { page, handlePageChange } = useContext(ContactContext);


  const handlePage = (newPage) => {
    handlePageChange(newPage);
  };

  return (
    <>
      <div className="flex gap-x-4 justify-center items-center">
        <button className="bg-purple-600 text-lg px-2 py-1 text-white rounded-2xl" disabled={page === 1} onClick={() => handlePage(page - 1)}>
          Previous
        </button>
        <span>{page}</span>
        <button className="bg-purple-600 text-lg px-4 py-1 text-white rounded-2xl" onClick={() => handlePage(page + 1)}>Next</button>
      </div>
    </>
  )
}