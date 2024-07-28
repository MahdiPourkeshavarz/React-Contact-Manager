import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactContext } from "../../contactContext";

/* eslint-disable react/prop-types */
export function DeleteToast() {
  const { deletedName, isConfirmed } = useContext(ContactContext);
  React.useEffect(() => {
    if (isConfirmed) {
      toast(`Deleted person: ${deletedName}`);
    }
  }, [isConfirmed, deletedName]);
  return (
    <>
      <ToastContainer />
    </>
  );
}
