import styles from './Filter.module.css';

//* Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);

  const onFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <input
      value={filterValue}
      onChange={onFilterChange}
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
};

export default Filter;
