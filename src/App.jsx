import { ContactForm } from "./components/contactForm/contactForm";
import { ContactList } from "./components/contactList/contactList";
import { DeleteModal } from "./components/deleteModal/deleteModal";
import { DeleteToast } from "./components/deleteModal/deleteToast";
import { Pagination } from "./components/pagination/pagination";
import { SearchBar } from "./components/searchBar/searchBar";

function App() {
  return (
    <>
      <SearchBar />
      <ContactForm />
      <ContactList />
      <Pagination />
      <DeleteModal />
      <DeleteToast />
    </>
  );
}

export default App;
