//* Components
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { Wave } from 'react-animated-text';

//* Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency } from '../redux/currencySlice';
import { setRates } from '../redux/operations';
import { useEffect } from 'react';

const Rates = () => {
  const isError = false;
  const baseCurrency = useSelector(selectBaseCurrency);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRates(baseCurrency));
  }, [dispatch, baseCurrency]);

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
