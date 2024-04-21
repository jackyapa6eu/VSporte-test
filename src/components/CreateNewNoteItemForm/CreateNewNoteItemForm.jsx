import { memo, useContext, useState } from 'react';
import { NotesContest } from '../../App';
import './index.css';

const CreateNewNoteItemForm = () => {
  const [newNoteText, setNewNoteText] = useState('');

  const { dispatch } = useContext(NotesContest);

  const handleNewNoteText = (event) => {
    setNewNoteText(event.target.value);
  };

  const onFinish = (event) => {
    event.preventDefault();
    const noteNoteItem = {
      id: Date.now(),
      description: newNoteText,
      checked: false,
    };
    dispatch({ type: 'createNoteItem', payload: noteNoteItem });
    setNewNoteText('');
  };

  return (
    <form onSubmit={onFinish} className='create-note-form'>
      <input
        className='create-note-form_text-input'
        type='text'
        value={newNoteText}
        onChange={handleNewNoteText}
      />
      <button className='create-note-form_submit-button' type='submit'>
        ДОБАВИТЬ
      </button>
    </form>
  );
};

export default memo(CreateNewNoteItemForm);
