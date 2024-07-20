import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/prop-types */
export function DeleteModal({ name }) {
  React.useEffect(() => {
    if (name) {
      toast(`Deleted person: ${name}`);
    }
  }, [name]);
  return (
    <>
      <h2>{name}</h2>
      <ToastContainer />
    </>
  );
}
