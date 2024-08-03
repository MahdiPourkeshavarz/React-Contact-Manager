/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ACTIONS, contactReducer, initialState } from "./reducer";

export const ContactContext = createContext();

const fetchContacts = async ({ queryKey }) => {
  const [, { searchValue, page, limit }] = queryKey;
  const params = new URLSearchParams();
  if (searchValue) params.append("q", searchValue);
  params.append("_page", page);
  params.append("_limit", limit);
  const { data } = await axios.get(
    `http://localhost:3000/contacts?${params.toString()}`
  );
  return data;
};

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

  const {
    data: contacts,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "contacts",
      { searchValue: state.searchValue, page: state.page, limit: 5 },
    ],
    queryFn: fetchContacts,
    onSuccess: (data) => {
      dispatch({ type: ACTIONS.SET_CONTACTS, payload: data });
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
      queryClient.invalidateQueries({ queryKey: "contacts" });
    },
  });

  const editMutation = useMutation({
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "contacts" });
    },
  });

  function onEdit(contactId) {
    dispatch({ type: ACTIONS.EDIT_CONTACT, payload: contactId });
  }

  function onDelete(contactId) {
    const contactToDelete = contacts.find(contact => contact.id === contactId);
    if (contactToDelete) {
      dispatch({ type: ACTIONS.SET_DELETED_NAME, payload: {personFullName: `${contactToDelete.firstName} ${contactToDelete.lastName}`, id: contactId} });
      dispatch({ type: ACTIONS.TOGGLE_MODAL });
    }
  }

  function submitHandler(newContact) {
    if (newContact.id === state.person.id) {
      editMutation.mutate(newContact)
    }
    addMutation.mutate(newContact);
    dispatch({ type: ACTIONS.SUBMIT_CONTACT, payload: newContact });
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
    dispatch({ type: ACTIONS.DELETE_CONTACT, payload: state.person.id });
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
    deleteMutation.mutate(state.person.id)
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: contacts,
        person: state.person,
        deletedName: state.deletedName,
        onEdit,
        onDelete,
        submitHandler,
        searchValue: state.searchValue,
        onSearch,
        onClose,
        onConfirm,
        isConfirmed: state.isConfirmed,
        error,
        isLoading,
        handlePageChange,
        isOpen: state.isOpen,
        page: state.page
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
