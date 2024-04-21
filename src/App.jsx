import './App.css';
import { createContext, useMemo, useReducer } from 'react';
import CreateNewNoteItemForm from './components/CreateNewNoteItemForm';
import logo from './assets/logo.svg';

export const NotesContest = createContext(null);

const reducerActions = {
  createNoteItem: (state, action) => ({ ...state, notes: [...state.notes, action.payload] }),
};

const reducer = (state, action) => {
  if (reducerActions[action.type]) {
    const newState = reducerActions[action.type](state, action);
    localStorage.setItem('NotesContest', JSON.stringify(newState));
    return newState;
  }

  return state;
};

const App = () => {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('NotesContest')) || { notes: [] }
  );

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NotesContest.Provider value={contextValue}>
      <div className='app'>
        <header className='header'>
          <img src={logo} alt='VSporte logo.' />
        </header>
        <main className='main-container'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: 'rgb(22 60 151 / 10%)',
            }}
          >
            <CreateNewNoteItemForm />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '6px 0' }}>
            {state.notes.map((el, index) => (
              <p
                style={{
                  fontSize: '14px',
                  color: '#062253',
                  background: 'white',
                  margin: 0,
                  padding: '12px',
                }}
                key={el.id}
              >
                <span>{index + 1}.</span>
                {el.description}
              </p>
            ))}
          </div>
        </main>
      </div>
    </NotesContest.Provider>
  );
};

export default App;
