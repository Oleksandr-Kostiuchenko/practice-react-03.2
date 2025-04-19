//* Components & pages
import Heading from './components/Heading/Heading';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Rates from './pages/Rates';
import toast, { Toaster } from 'react-hot-toast';

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
        toast.error('Sorry! Something went wrong!', {
          duration: 5000,
        });
      }
    }

    function error() {
      dispatch(setDefaultCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
