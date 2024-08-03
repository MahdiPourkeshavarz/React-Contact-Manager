/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ACTIONS, contactReducer, initialState } from "./reducer";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ContactContext = createContext();

const addContact = async (contact) => {
  const { data } = await axios.post("http://localhost:3000/contacts", contact);
  return data;
};

const deleteContact = async (contactId) => {
  await axios.delete(`http://localhost:3000/contacts/${contactId}`);
};

const editContact = async (contact) => {
  const { data } = await axios.patch(
    `http://localhost:3000/contacts/${contact.id}`,
    contact
  );
  return data;
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const queryClient = useQueryClient();

  const fetchContacts = async ({ queryKey }) => {
    const [, { searchValue, page, limit }] = queryKey;
    const params = new URLSearchParams();
    if (searchValue) params.append("q", searchValue);
    params.append("_page", page);
    params.append("_limit", limit);
    const { data } = await axios.get(
      `http://localhost:3000/contacts?${params.toString()}`
    );
    dispatch({ type: ACTIONS.SET_CONTACTS, payload: data });
    return data;
  };

  const {
    data: contacts,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "contacts",
      { searchValue: state.searchValue, page: state.page, limit: 5 },
    ],
    queryFn: fetchContacts,
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      relation: "",
      email: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "نام باید حداقل سه حرف باشد")
        .required("نام الزامی است."),
      lastName: Yup.string()
        .min(3, "نام خوانوادگی باید حداقل 3 حرف باشد")
        .required("نام خوانوادگی الزامی است"),
      phoneNumber: Yup.string()
        .matches(/^09[0-9]+$/, "شماره تماس باید فقط عدد باشد.")
        .min(11, "شماره تلفن باید ۱۱ رقم باشد.")
        .max(11, "شماره تلفن باید ۱۱ رقم باشد.")
        .required("شماره تلفن الزامیست"),
      relation: Yup.string().required("الزامی"),
      email: Yup.string()
        .email("ایمیل به صورت نادرست وارد شده است.")
        .required("ایمیل الزامی است."),
    }),
    onSubmit: (values) => {
      submitHandler({ ...values });
      formik.resetForm();
    },
  });

  const addMutation = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "contacts" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: "contacts" });
      refetch();
    },
  });

  const editMutation = useMutation({
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  function onEdit(contactId) {
    dispatch({ type: ACTIONS.EDIT_CONTACT, payload: contactId });
  }

  function onDelete(contactId) {
    const contactToDelete = contacts.find(
      (contact) => contact.id === contactId
    );
    if (contactToDelete) {
      dispatch({
        type: ACTIONS.SET_DELETED_NAME,
        payload: [
          `${contactToDelete.firstName} ${contactToDelete.lastName}`,
          contactId,
        ],
      });
      dispatch({ type: ACTIONS.TOGGLE_MODAL });
    }
  }

  function submitHandler(newContact) {
    const id = crypto.randomUUID()
    if (newContact.id === state.person.id) {
      editMutation.mutate(newContact);
      return;
    }
    addMutation.mutate({...newContact, id});
    dispatch({ type: ACTIONS.SUBMIT_CONTACT, payload: {...newContact, id} });
  }

  function onSearch(value) {
    dispatch({ type: ACTIONS.SET_SEARCH_VALUE, payload: value });
  }

  function handlePageChange(page) {
    dispatch({ type: ACTIONS.SET_PAGE, payload: page });
  }

  function onClose() {
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
  }

  function onConfirm() {
    dispatch({ type: ACTIONS.DELETE_CONTACT, payload: state.deletePersonId });
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
    deleteMutation.mutate(state.deletePersonId);
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: contacts,
        person: state.person,
        deletedName: state.deletedName,
        onEdit,
        onDelete,
        searchValue: state.searchValue,
        onSearch,
        onClose,
        onConfirm,
        isConfirmed: state.isConfirmed,
        error,
        isLoading,
        handlePageChange,
        isOpen: state.isOpen,
        page: state.page,
        formik
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
