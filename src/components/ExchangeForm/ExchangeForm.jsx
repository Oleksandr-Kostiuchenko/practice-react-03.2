//* Libraries
import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';

//* Redux
import { useDispatch } from 'react-redux';
import { setExchangeInfo } from '../../redux/operations';

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const onFormSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const inputValue = form.elements.userInput.value.trim('');
    const inputValueObj = inputValue.split(' ');

    const regex = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

    if (!regex.test(inputValue)) {
      alert('Invalid format! Please use the format: "15 USD in UAH".');
      return;
    }

    const resultObj = {
      to: inputValueObj[3],
      from: inputValueObj[1],
      amount: inputValueObj[0],
    };

    dispatch(setExchangeInfo(resultObj));

    console.log('Succeess!', inputValue);
    console.log(resultObj);
    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        name="userInput"
        title="Request format 15 USD in UAH"
        className={styles.input}
      />
    </form>
  );
};

export default ExchangeForm;
