/* eslint-disable react/prop-types */
export function ContactItem({
  firstName,
  lastName,
  phoneNumber,
  relation,
  email,
  id,
  onDelete,
  onEdit,
}) {
  return (
    <>
      <div className="contact-item bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg rounded-xl p-6 mb-4 text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
            <p className="text-sm">{relation}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(id)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536-9.192 9.192H6v-3.536l9.192-9.192zM16.768 3.768a1.5 1.5 0 112.121 2.121l-1.5 1.5-3.536-3.536 1.5-1.5z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2h-8a2 2 0 012-2zm6 4H5m4 0v12m4-12v12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>
      </div>
    </>
  );
}
