//* Components & pages
import Heading from './components/Heading/Heading';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Rates from './pages/Rates';

//* Router
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

//* Redux
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from './redux/operations';
import { setDefaultCurrency } from './redux/currencySlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0,
    };

    function success() {
      try {
        const currencyData = navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            dispatch(setBaseCurrency(coords));
          },
        );
      } catch (error) {
        alert('Sorry! Something went wrong!');
        console.log(error);
      }
    }

    function error() {
      dispatch(setDefaultCurrency());
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
