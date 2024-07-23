/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { contacts as initialContacts } from "../data/database";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [person, setPerson] = useState({});
  const [deletedName, setDeletedName] = useState("");

  function onEdit(idNumber) {
    const personToEdit = contacts.find((person) => person.id === idNumber);
    setPerson(personToEdit);
    const remainingContacts = contacts.filter(
      (person) => person.id !== idNumber
    );
    setContacts(remainingContacts);
  }

  function onDelete(idNumber) {
    const remainingContacts = contacts.filter(
      (person) => person.id !== idNumber
    );
    const deletedPerson = contacts.find((person) => person.id === idNumber);
    setDeletedName(`${deletedPerson.firstName} ${deletedPerson.lastName}`);
    setContacts(remainingContacts);
  }

  function submitHandler(newContact) {
    const contactExists = contacts.some(
      (contact) => contact.id === newContact.id
    );
    if (contactExists) {
      setContacts(
        contacts.map((contact) =>
          contact.id === newContact.id ? newContact : contact
        )
      );
    } else {
      setContacts([...contacts, newContact]);
    }
    setPerson({});
  }

  return (
    <ContactContext.Provider
      value={{
        contacts,
        person,
        deletedName,
        onEdit,
        onDelete,
        submitHandler,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
