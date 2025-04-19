//* Libraries
import './ReactSelect.css';
import Select from 'react-select';
import symbols from './symbols.json';
import styles from './SelectRates.module.css';
import toast from 'react-hot-toast';

//* Redux
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from '../../redux/operations';
import { setDefaultCurrency } from '../../redux/currencySlice';

const SelectRates = ({ baseCurrency }) => {
  const dispatch = useDispatch();

  const onCurrencyChange = changedOption => {
    dispatch(setDefaultCurrency(changedOption.value));
    toast.success(`Switched to ${changedOption.value}`, {
      duration: 5000,
    });
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        onChange={onCurrencyChange}
        options={symbols}
        isSearchable
      />
    </div>
  );
};

export default SelectRates;
