import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import { Preloader } from '@ui';
import { Routes, Route, Outlet, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';

import type { AppContentProps } from './type';

import '../../index.css';

import styles from './app.module.css';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect, useLayoutEffect } from 'react';
import { fetchAllIngredients } from '@/services/slices/allIngredientsSlice';
import { fetchUser } from '@/services/slices/userSlice';
import { fetchOrders } from '@/services/slices/ordersSlice';
import { fetchFeeds } from '@/services/slices/feedsSlice';

const App = (): React.JSX.Element => {
  const { data: ingredients, loading: isIngredientsLoading, error: ingredientsError } = useSelector((state) => state.allIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllIngredients());
    dispatch(fetchUser());
    dispatch(fetchOrders());
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent
        ingredients={ingredients}
        isLoading={isIngredientsLoading}
        error={ingredientsError}
      />
    </div>
  );
};

export default App;

const AppContent = ({
  ingredients,
  isLoading,
  error,
}: AppContentProps): React.JSX.Element => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты
        {error.message ? `: ${error.message}` : '.'}
      </p>
    );
  }

  if (!ingredients.length) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>Нет ингредиентов</p>
    );
  }

  return <RouteComponent />;
};

const RouteComponent = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path='/register' element={<ProtectedRoute onlyUnAuth />}>
          <Route path="" element={<Register />} />
        </Route>
        <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth />}>
          <Route path="" element={<ForgotPassword />} />
        </Route>
        <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth />}>
          <Route path="" element={<ResetPassword />} />
        </Route>
        <Route path='/profile' element={<ProtectedRoute />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path='/profile/orders' element={<ProtectedRoute />}>
          <Route path="" element={<ProfileOrders />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfoPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
        <Route path='/profile/orders/:number' element={<ProtectedRoute />}>
          <Route path="" element={<OrderInfoPage />} />
        </Route>
      </Routes>
      {backgroundLocation &&
        <Routes>
          <Route path='/feed/:number' element={<OrderInfoModal onClose={() => { navigate(-1) }} />} />
          <Route path='/ingredients/:id' element={<Modal titleClasses='text text_type_main-large' title='Детали ингридиента' onClose={() => { navigate(-1); }}><IngredientDetails /></Modal>} />
          <Route path='/profile/orders/:number' element={<ProtectedRoute />}>
            <Route path="" element={<OrderInfoModal onClose={() => { navigate(-1) }} />} />
          </Route>
        </Routes>
      }
    </>
  );
};

const ProtectedRoute = ({ onlyUnAuth }: { onlyUnAuth?: boolean }): React.JSX.Element => {
  const user = useSelector((state) => state.user);

  if (user.loading) {
    return <Preloader />;
  }

  if (user.user && onlyUnAuth) {
    return <Navigate replace to='/profile' />;
  }

  if (!user.user && !onlyUnAuth) {
    return <Navigate replace to='/login' />;
  }

  return <Outlet />;
}

const OrderInfoModal = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  const { number } = useParams<'number'>();

  return (
    <Modal titleClasses={`text text_type_digits-default ${styles.titleOrder}`} title={`#${number}`} onClose={onClose}><OrderInfo /></Modal>
  )
}

const IngredientDetailsPage = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }} className="text text_type_main-large">
        Детали ингридиента
      </h3>
      <IngredientDetails />
    </div>
  )
}

const OrderInfoPage = () => {
  const { number } = useParams<'number'>();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.feeds.loading || state.orders.loading);

  useLayoutEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div style={{ margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }} className={`text text_type_digits-default ${styles.titleOrder}`}>
        #{number}
      </h3>
      <OrderInfo />
    </div>
  )
}