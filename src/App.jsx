import { ContactForm } from "./components/contactForm/contactForm";
import { ContactList } from "./components/contactList/contactList";
import { DeleteModal } from "./components/deleteModal/deleteModal";

function App() {
  return (
    <>
      <ContactForm />
      <ContactList />
      <DeleteModal />
    </>
  );
}

export default App;
