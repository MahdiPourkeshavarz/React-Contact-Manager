import { useContext } from "react";
import { ContactContext } from "../../contactContext";

export function DeleteModal() {
  const { isOpen, onClose, onConfirm, deletedName } =
    useContext(ContactContext);
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">Deleting Contact</h2>
          <p className="text-gray-700 mb-6">
            Are You sure about deleting {deletedName} ?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
