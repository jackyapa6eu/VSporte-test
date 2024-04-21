import './App.css';
import { useMemo, useReducer } from 'react';
import CreateNewNoteItemForm from '../CreateNewNoteItemForm';
import logo from '../../assets/logo.svg';
import NotesList from '../NotesList';
import Filters from '../Filters';
import { initialNotesContest, reducer, NotesContest } from '../../contexts/NotesContext';

const App = () => {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('NotesContest')) || initialNotesContest
  );

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NotesContest.Provider value={contextValue}>
      <div className='app'>
        <header className='header'>
          <img src={logo} alt='VSporte logo.' />
        </header>
        <main className='main'>
          <div className='main__menu'>
            <CreateNewNoteItemForm />
            <Filters />
          </div>
          <NotesList />
        </main>
      </div>
    </NotesContest.Provider>
  );
};

export default App;
