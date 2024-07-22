/* eslint-disable react/prop-types */

import { ContactItem } from "./contactItem/contactItem";

export function ContactList({ data, onEdit, onDelete }) {
  return (
    <>
      <h1 className="mb-8">Contacts</h1>
      <div className="grid lg:grid-cols-3 gap-y-8 px-4 gap-x-48 md:grid-cols-2">
        {data &&
          data.map((contact) => {
            return (
              <>
                <ContactItem
                  key={contact.id}
                  {...contact}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </>
            );
          })}
      </div>
    </>
  );
}
