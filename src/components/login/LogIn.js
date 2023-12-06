import React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { login } from '../../features/auth/operations';
import Loading from '../loading/Loading';
import { selectIsLoading } from '../../features/auth/selectors';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .min(8, { length: 'Password is too short!' })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
      message: {
        number:
          'The password must contain a minimum of 6 characters, at least one letter, one number, and one special character',
      },
    })
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required!'),
});

const initialValues = {
  email: '',
  password: '',
  showPassword: false,
};

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    const data = await dispatch(login({ email, password }));
    if (data.error.message === 'Rejected') {
      toast.error('Email or password is wrong');
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      <Form className="register-form">
        <div className="form-wrapper">
          <ErrorMessage className="form-error" name="email" component="div" />
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="form-field"
            autoComplete="off"
          />
        </div>

        <div className="form-wrapper">
          <ErrorMessage
            className="form-error"
            name="password"
            component="div"
          />
          <Field
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Confirm a password"
            className="form-field"
            autoComplete="off"
          />
          <span className="form-icon" onClick={handleTogglePassword}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button className="welcome-button" type="submit">
          {loading ? <Loading /> : 'Login now'}
        </button>
      </Form>
    </Formik>
  );
};

export default LogInForm;
