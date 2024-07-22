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
      <div className="flex flex-col gap-x-2 bg-purple-600 text-white font-semibold text-xl w-[350px] p-2 h-max text-right rounded-xl gap-y-4">
        <div className="flex items-center justify-between flex-row-reverse">
          <p>{`${firstName} ${lastName}`}</p>
          <div className="flex items-center gap-x-2">
            <button onClick={onEdit}>
              <img
                src="../../src/assets/edit.png"
                alt="_"
                className="w-[24px] h-auto"
              />
            </button>
            <button
              onClick={() => {
                onDelete(id);
                console.log(id);
              }}
            >
              <img
                src="../../src/assets/bin.png"
                alt="_"
                className="w-[24px] h-auto"
              />
            </button>
          </div>
        </div>
        <p>{phoneNumber}</p>
        <p>{relation}</p>
        <p>{email}</p>
      </div>
    </>
  );
}
