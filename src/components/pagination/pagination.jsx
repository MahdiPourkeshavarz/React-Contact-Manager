import { useContext } from "react";
import { ContactContext } from "../../contactContext";


export function Pagination() {
  const { page, handlePageChange } = useContext(ContactContext);


  const handlePage = (newPage) => {
    handlePageChange(newPage);
  };

  return (
    <>
      <div>
        <button disabled={page === 1} onClick={() => handlePage(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePage(page + 1)}>Next</button>
      </div>
    </>
  )
}