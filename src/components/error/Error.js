import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetError } from '../../features/auth/authSlice';

const ErrorMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="loading-container">
      <h1> Sorry, the page you visited does not exist.</h1>
      <button
        type="primary"
        onClick={() => {
          dispatch(resetError());
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
};
export default ErrorMessage;
