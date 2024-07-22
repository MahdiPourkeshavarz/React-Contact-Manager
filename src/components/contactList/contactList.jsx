/* eslint-disable react/prop-types */

import { ContactItem } from "./contactItem/contactItem";

export function ContactList({ data, onEdit, onDelete }) {
  return (
    <>
      <p className="mb-8 mt-4 font-semibold text-xl">مخاطبین</p>
      <div className="grid lg:grid-cols-3 gap-y-8 px-4 gap-x-48 md:grid-cols-2">
        {data &&
          data.map((contact) => {
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
