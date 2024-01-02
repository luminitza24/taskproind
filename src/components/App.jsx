import { tokens } from './theme';

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-ui';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import SharedLayout from './components/shared-layout/SharedLayout';
import Loading from './components/loading/Loading';
import { Home } from './pages/home-page/HomePage.jsx';
import ErrorPage from './pages/error-page/ErrorPage';

import { useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
const AuthPage = lazy(() => import('./pages/auth/Auth.js'));
const WelcomePage = lazy(() => import('./pages/welcome/Welcome.js'));

ReactDOM.render(
  <ThemeProvider tokens={tokens}>
    {' '}
    <App />{' '}
  </ThemeProvider>,
  document.getElementById('root')
);

export const App = () => {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      {isRefreshing ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<WelcomePage />}
                />
              }
            />
            <Route
              path="/home"
              element={<PrivateRoute redirectTo="/" component={<Home />} />}
            ></Route>
            <Route
              path="/home/:boardId"
              element={<PrivateRoute redirectTo="/" component={<Home />} />}
            ></Route>
            <Route
              path="auth/:id"
              element={
                <RestrictedRoute redirectTo="/home" component={<AuthPage />} />
              }
            ></Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </div>
  );
};
