import { memo, useContext } from 'react';
import './index.css';
import { NotesContest } from '../../contexts/NotesContext';

const NotesListItem = ({ index, noteData }) => {
  const { dispatch } = useContext(NotesContest);

  const onNoteDoneChange = (event) => {
    dispatch({
      type: 'editNoteStatusItem',
      payload: { ...noteData, status: event.target.checked ? 'done' : 'active' },
    });
  };

  const onNoteDelete = () => {
    dispatch({ type: 'deleteNote', payload: noteData });
  };

  return (
    <div className='notes-list__item'>
      <div className='notes-list__checkbox-text-container'>
        <label
          htmlFor='notes-list-checkbox'
          className={`${'notes-list__checkbox-label'} ${
            noteData.status === 'done' ? 'notes-list__checkbox-label_checked' : ''
          }`}
        >
          <input
            type='checkbox'
            id='notes-list-checkbox'
            className='notes-list__checkbox'
            checked={noteData.status === 'done'}
            onChange={onNoteDoneChange}
          />
        </label>
        <p className='notes-list__item-text'>
          <span className='notes-list__item-number'>{index}.</span>
          <span>{noteData.description}</span>
        </p>
      </div>

      <button type='button' onClick={onNoteDelete} className='notes-list__delete-button'>
        ✖
      </button>
    </div>
  );
};

export default memo(NotesListItem);
