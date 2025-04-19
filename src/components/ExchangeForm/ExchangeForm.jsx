//* Libraries
import { RiExchangeDollarFill } from 'react-icons/ri';
import { IoIosSwap } from 'react-icons/io';
import styles from './ExchangeForm.module.css';
import toast from 'react-hot-toast';
import Select from 'react-select';
import symbols from '../SelectRates/symbols.json';

//* Redux
import { useDispatch, useSelector } from 'react-redux';
import { setExchangeInfo } from '../../redux/operations';
import { useState } from 'react';
import { selectExchangeData } from '../../redux/currencySlice';

const ExchangeForm = () => {
  const exchangeData = useSelector(selectExchangeData);

  const [fromCurrency, setFromCurrency] = useState({
    label: 'USD',
    value: 'USD',
  });
  const [toCurrency, setToCurrency] = useState({
    label: 'UAH',
    value: 'UAH',
  });

  const dispatch = useDispatch();

  const onFormSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const input = form.elements.userInput;
    const fromSwitcher = form.elements.fromCurr;
    const toSwitcher = form.elements.toCurr;

    if (input.value <= 0) {
      toast.error('Please enter valid number!');
      return;
    }

    const resultObj = {
      to: toSwitcher.value,
      from: fromSwitcher.value,
      amount: input.value,
    };

    dispatch(setExchangeInfo(resultObj))
      .unwrap()
      .then(() => {
        toast.success('Success!', {
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error('Error! Smth went wrong...', {
          duration: 3000,
        });
      });

    // form.reset();
  };

  const handleInvert = event => {
    const form = event.target.closest('form');
    const input = form.elements.userInput;

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    if (exchangeData) {
      const resultObj = {
        to: toCurrency.value,
        from: fromCurrency.value,
        amount: input.value,
      };

      dispatch(setExchangeInfo(resultObj))
        .unwrap()
        .then(() => {
          toast.success('Success!', {
            duration: 3000,
          });
        })
        .catch(() => {
          toast.error('Error! Smth went wrong...', {
            duration: 3000,
          });
        });
    }

    toast.success('Successfully inverted!', {
      duration: 3000,
    });
  };

  return (
    <>
      <form className={styles.formWrapper} onSubmit={onFormSubmit}>
        <div className={styles.switchersWrapper}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputNum}
              name="userInput"
              title="Request format 15 USD in UAH"
              type="number"
            />
            <Select
              value={fromCurrency}
              onChange={selectedCurr => {
                setFromCurrency(selectedCurr);
              }}
              className={styles.select}
              name="fromCurr"
              classNamePrefix="react-select"
              options={symbols}
              isSearchable
            />
          </div>

          <div className={styles.buttonsWrapper}>
            <button type="submit">
              <RiExchangeDollarFill className={styles.icon} />
            </button>

            <button type="button" onClick={handleInvert}>
              <IoIosSwap className={styles.icon} />
            </button>
          </div>

          <Select
            value={toCurrency}
            onChange={selectedCurr => {
              setToCurrency(selectedCurr);
            }}
            className={styles.select}
            name="toCurr"
            classNamePrefix="react-select"
            options={symbols}
            isSearchable
          />
        </div>
      </form>
    </>
  );
};

export default ExchangeForm;
