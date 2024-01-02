import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { register } from '../../features/auth/operations';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Loading from '../loading/Loading';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../features/auth/selectors';
import './Register.css';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .min(8, { length: 'Password is too short!' })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
      message: {
        number:
          'The password must contain a minimum of 6 characters, at least one letter, one number, and one special character!',
      },
    })
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required!'),
});
const initialValues = {
  name: '',
  email: '',
  password: '',
  showPassword: false,
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = (values, { resetForm }) => {
    const { name, email, password } = values;
    dispatch(
      register({
        name,
        email,
        password,
      })
    );
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      <Form className="register-form">
        <div className="form-wrapper">
          <ErrorMessage name="name" component="div" className="form-error" />
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            autoComplete="off"
            className="form-field"
          />
        </div>
        <div className="form-wrapper">
          <ErrorMessage name="email" component="div" className="form-error" />
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="off"
            className="form-field"
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
            placeholder="Create a password"
            autoComplete="off"
            className="form-field"
          />
          <span className="form-icon" onClick={handleTogglePassword}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button className="welcome-button" type="submit">
          {loading ? <Loading /> : 'Register now'}
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
