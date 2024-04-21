import { memo, useContext } from 'react';
import './index.css';
import { NotesContest } from '../../contexts/NotesContext';

const Filters = () => {
  const { dispatch, state } = useContext(NotesContest);

  const handleSelectChange = (event) => {
    dispatch({
      type: 'filterItems',
      payload: { field: 'status', value: event.target.value },
    });
  };

  return (
    <div className='filters-container'>
      <select
        className='filters-container__select'
        value={state.filters.status}
        onChange={handleSelectChange}
      >
        <option className='filters-container__select-option' value='all'>
          Все
        </option>
        <option value='active'>Активные</option>
        <option value='done'>Выполненные</option>
      </select>
    </div>
  );
};

export default memo(Filters);
