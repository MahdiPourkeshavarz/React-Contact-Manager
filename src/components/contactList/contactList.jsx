/* eslint-disable react/prop-types */

export function ContactList({ data, onEdit, onDelete }) {
  return (
    <>
      <h2>Contacts</h2>
      <div className="grid grid-cols-3 gap-y-8 px-4">
        {data &&
          data.map((contact) => {
            return (
              <>
                <div className="flex flex-col gap-x-2 bg-purple-600 text-white font-semibold text-xl w-[350px] p-2 h-max text-right">
                  <div className="flex items-center justify-between">
                    <p>{`${contact.firstName} ${contact.lastName}`}</p>
                    <div className="flex items-center gap-x-2">
                      <button onClick={onEdit}>
                        <img src="../../assets/edit.png" alt="_" />
                      </button>
                      <button onClick={onDelete}>
                        <img src="../../assets/delete.png" alt="_" />
                      </button>
                    </div>
                  </div>
                  <p>{contact.phoneNumber}</p>
                  <p>{contact.relation}</p>
                  <p>{contact.email}</p>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
