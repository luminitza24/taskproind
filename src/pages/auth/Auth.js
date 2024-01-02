import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import RegisterForm from '../../components/register/RegisterForm';
import LogInForm from '../../components/login/LogIn';
import Loading from '../../components/loading/Loading';

const Auth = () => {
  const { id } = useParams();

  return (
    <div className="welcome-wrapper">
      <ToastContainer />
      <div className="form-container">
        <div className="link-wrapper">
          <NavLink className="auth-links" to="/auth/register">
            Registration
          </NavLink>
          <NavLink className="auth-links" to="/auth/login">
            Log In
          </NavLink>
        </div>

        {id === 'login' && <LogInForm />}
        {id === 'register' && <RegisterForm />}

        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Auth;
