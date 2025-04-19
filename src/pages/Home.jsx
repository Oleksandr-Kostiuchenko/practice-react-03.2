//* Components
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader';

//* Redux
import { useSelector } from 'react-redux';
import {
  selectExchangeData,
  selectError,
  selectIsLoading,
} from '../redux/currencySlice';

const Home = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeData);

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />

        {exchangeInfo && (
          <ExchangeInfo
            amount={exchangeInfo.amount}
            from={exchangeInfo.from}
            to={exchangeInfo.to}
            rate={exchangeInfo.rate}
            result={exchangeInfo.result}
          />
        )}

        {/* {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )} */}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default Home;
