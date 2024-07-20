import { ContactForm } from "./components/contactForm/contactForm";
import { ContactList } from "./components/contactList/contactList";
import { contacts } from "../data/database";
import { DeleteModal } from "./components/deleteModal/deleteModal";

function App() {
  let person = {};
  let deletedName = "";
  let peoples = [...contacts];
  function onEdit(idNumber) {
    person = contacts.filter((person) => person.id !== idNumber);
    peoples = contacts.filter((person) => person.id === idNumber);
  }

  function onDelete(idNumber) {
    const deletedperson = contacts.filter((person) => person.id !== idNumber);
    deletedName = `${deletedperson.firstName} ${deletedperson.lastName}`;
  }

  function submitHandler(person) {
    peoples = [...contacts, person];
  }

  return (
    <>
      <ContactForm onSubmit={submitHandler} data={person} />
      <ContactList data={peoples} onEdit={onEdit} onDelete={onDelete} />
      {deletedName && <DeleteModal name={deletedName} />}
    </>
  );
}

export default App;
