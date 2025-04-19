//* Components
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Filter from '../components/Filter/Filter';
import { Wave } from 'react-animated-text';

//* Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency, selectRates } from '../redux/currencySlice';
import { setRates } from '../redux/operations';
import RatesList from '../components/RatesList/RatesList';

const Rates = () => {
  const dispatch = useDispatch();

  const isError = false;
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(setRates(baseCurrency));
    }
  }, [dispatch, baseCurrency]);

  const ratesData = useSelector(selectRates);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />

        <Filter />

        {ratesData.length > 0 && <RatesList rates={ratesData} />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
