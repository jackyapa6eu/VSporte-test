import { memo, useContext, useMemo } from 'react';
import './index.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
    <TransitionGroup>
      <ul className='notes-list'>
        {filteredNotes.map((noteData, index) => (
          <CSSTransition
            key={noteData.id}
            in // Булевое значение, определяющее, должен ли элемент появиться
            timeout={300} // Длительность анимации в миллисекундах
            classNames='fade' // Название CSS класса анимации
            unmountOnExit // Опция для удаления элемента из DOM после завершения анимации
          >
            <li>
              <NotesListItem index={index + 1} noteData={noteData} />
            </li>
          </CSSTransition>
        ))}
        {!filteredNotes.length && <p className='notes-list__nothing-found'>Список пуст.</p>}
      </ul>
    </TransitionGroup>
  );
};

export default memo(NotesList);
