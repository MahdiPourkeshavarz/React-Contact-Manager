/* eslint-disable no-case-declarations */
export const initialState = {
  contacts: [],
  person: {},
  deletedName: "",
  searchValue: "",
  isOpen: false,
  isConfirmed: false,
  page: 1,
  limit: 5,
  deletePersonId: null,
};

export const ACTIONS = {
  SET_CONTACTS: "setContact",
  SET_PERSON: "setPerson",
  SET_DELETED_NAME: "setDeletedName",
  EDIT_CONTACT: "editContact",
  DELETE_CONTACT: "deleteContact",
  SUBMIT_CONTACT: "submitContact",
  SET_SEARCH_VALUE: "setSearchValue",
  TOGGLE_MODAL: "toggleModal",
  SET_CONFIRMATION: "setConfirmation",
  SET_PAGE: "setPage",
};

export function contactReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      console.log(action.payload);
      return { ...state, contacts: action.payload };
    case ACTIONS.SET_PERSON:
      return { ...state, person: action.payload };
    case ACTIONS.SET_DELETED_NAME:
      return {
        ...state,
        deletedName: action.payload[0],
        deletePersonId: action.payload[1],
      };
    case ACTIONS.EDIT_CONTACT:
      console.log(action.payload);
      const personToEdit = state.contacts.find(
        (person) => person.id === action.payload
      );
      console.log(personToEdit, state.contacts);
      const remainingContacts = state.contacts.filter(
        (person) => person.id !== action.payload
      );
      return {
        ...state,
        person: personToEdit,
        contacts: remainingContacts,
      };
    case ACTIONS.DELETE_CONTACT:
      const remaining = state.contacts.filter(
        (person) => person.id !== action.payload
      );
      return {
        ...state,
        contacts: remaining,
        deletedName: "",
      };
    case ACTIONS.SUBMIT_CONTACT:
      const contactExists = state.contacts.some(
        (person) => person.id === action.payload.id
      );
      return {
        ...state,
        contacts: contactExists
          ? state.contacts.map((person) =>
              person.id === action.payload.id ? action.payload : person
            )
          : [...state.contacts, action.payload],
        person: {},
      };
    case ACTIONS.SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case ACTIONS.TOGGLE_MODAL:
      return { ...state, isOpen: !state.isOpen };
    case ACTIONS.SET_CONFIRMATION:
      return { ...state, isConfirmed: !state.isConfirmed };
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
