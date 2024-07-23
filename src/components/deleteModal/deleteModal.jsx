import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactContext } from "../../contactContext";

/* eslint-disable react/prop-types */
export function DeleteModal() {
  const { deletedName } = useContext(ContactContext);
  React.useEffect(() => {
    if (deletedName) {
      toast(`Deleted person: ${deletedName}`);
    }
  }, [deletedName]);
  return (
    <>
      <ToastContainer />
    </>
  );
}
