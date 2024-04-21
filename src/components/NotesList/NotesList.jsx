import { memo, useContext, useMemo } from 'react';
import './index.css';
import NotesListItem from '../NotesListItem';
import { NotesContest } from '../../contexts/NotesContext';

const NotesList = () => {
  const { state } = useContext(NotesContest);
  const { notes, filters } = state;

  const filteredNotes = useMemo(
    () => notes.filter((note) => filters.status === 'all' || filters.status === note.status),
    [notes, filters]
  );

  return (
    <ul className='notes-list'>
      {filteredNotes.map((noteData, index) => (
        <li key={noteData.id}>
          <NotesListItem index={index + 1} noteData={noteData} />
        </li>
      ))}
      {!filteredNotes.length && <p className='notes-list__nothing-found'>Список пуст.</p>}
    </ul>
  );
};

export default memo(NotesList);
