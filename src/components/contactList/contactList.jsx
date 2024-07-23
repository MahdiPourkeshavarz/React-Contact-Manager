/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ContactItem } from "./contactItem/contactItem";
import { ContactContext } from "../../contactContext";

export function ContactList() {
  const { contacts, onEdit, onDelete } = useContext(ContactContext);
  return (
    <>
      <p className="mb-8 mt-4 font-semibold text-xl">مخاطبین</p>
      <div className="grid lg:grid-cols-3 gap-y-8 px-4 gap-x-48 md:grid-cols-2">
        {contacts &&
          contacts.map((contact) => {
            return (
              <ContactItem
                key={contact.id}
                {...contact}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })}
      </div>
    </>
  );
}
