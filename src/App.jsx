import { ContactForm } from "./components/contactForm/contactForm";
import { ContactList } from "./components/contactList/contactList";
import { contacts as initialContacts } from "../data/database";
import { DeleteModal } from "./components/deleteModal/deleteModal";
import { useState } from "react";

function App() {
  const [person, setPerson] = useState({});
  const [deletedName, setDeletedName] = useState("");
  const [contacts, setContacts] = useState(initialContacts);

  function onEdit(idNumber) {
    const personToEdit = contacts.find((person) => person.id === idNumber);
    setPerson(personToEdit);
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
    <>
      <ContactForm onSubmit={submitHandler} data={person} />
      <ContactList data={contacts} onEdit={onEdit} onDelete={onDelete} />
      {deletedName && <DeleteModal name={deletedName} />}
    </>
  );
}

export default App;
