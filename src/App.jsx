import { ContactForm } from "./components/contactForm/contactForm";
import { ContactList } from "./components/contactList/contactList";
import { contacts as initialContacts } from "../data/database";
import { DeleteModal } from "./components/deleteModal/deleteModal";
import { useState } from "react";

function App() {
  let person = {};
  let deletedName = "";
  const [contacts, setContacts] = useState(initialContacts);
  function onEdit(idNumber) {
    person = contacts.filter((person) => person.id !== idNumber);
    setContacts(contacts.filter((person) => person.id === idNumber));
  }

  function onDelete(idNumber) {
    console.log(idNumber);
    const deletedperson = contacts.filter((person) => person.id !== idNumber);
    deletedName = `${deletedperson.firstName} ${deletedperson.lastName}`;
    setContacts(contacts.filter((person) => person.id === idNumber));
  }

  function submitHandler(newContact) {
    setContacts([...contacts, newContact]);
  }

  return (
    <>
      <ContactForm onSubmit={submitHandler} data={person} />
      <ContactList data={contacts} onEdit={onEdit} onDelete={onDelete} />
      {deletedName && <DeleteModal name={deletedName} />}
    </>
  );
}

export default App;
