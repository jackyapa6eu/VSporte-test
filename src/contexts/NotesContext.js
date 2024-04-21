import { createContext } from 'react';

const reducerActions = {
  createNoteItem: (state, action) => ({ ...state, notes: [...state.notes, action.payload] }),
  editNoteStatusItem: (state, action) => ({
    ...state,
    notes: state.notes.map((note) => (action.payload.id === note.id ? action.payload : note)),
  }),
  deleteNote: (state, action) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== action.payload.id),
  }),
  filterItems: (state, action) => ({
    ...state,
    filters: { ...state.filters, [action.payload.field]: action.payload.value },
  }),
};

const reducer = (state, action) => {
  if (reducerActions[action.type]) {
    const newState = reducerActions[action.type](state, action);
    localStorage.setItem('NotesContest', JSON.stringify(newState));
    return newState;
  }

  return state;
};

const NotesContest = createContext(null);
const initialNotesContest = { notes: [], filters: { status: 'all' } };

export { reducer, reducerActions, initialNotesContest, NotesContest };
