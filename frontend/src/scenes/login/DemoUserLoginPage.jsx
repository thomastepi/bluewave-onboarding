import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { login } from '../../services/loginServices';
import { handleAuthSuccess } from '../../utils/loginHelper';
import { useAuth } from '../../services/authProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { DEMO_USER_CREDENTIALS } from '../../utils/constants';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo/Logo';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .trim(),
  password: Yup.string().required('Password is required').trim(),
});

function DemoUserLoginPage({ isAdmin = false }) {
  const [serverErrors, setServerErrors] = useState([]);
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/';

  useEffect(() => {
    if (isAdmin) {
      navigate('/signup');
    }
  }, [isAdmin]);

  return (
    <Formik
      initialValues={DEMO_USER_CREDENTIALS}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setServerErrors([]);
        try {
          const response = await login(values);
          handleAuthSuccess(response, loginAuth, navigate, redirectTo);
        } catch (error) {
          if (error.response?.data?.errors) {
            setServerErrors(error.response.data.errors);
          } else if (error.response?.data?.error) {
            setServerErrors([error.response.data.error]);
          } else {
            setServerErrors([
              'An error occurred. Please check your network connection and try again.',
            ]);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles['login-container']}>
          <Logo />
          <h2>Sign in as Demo User</h2>

          <div>
            {serverErrors.length > 0 && (
              <div className={styles['error-message']}>
                {serverErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles['sign-in-button']}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={12} color="inherit" />
            ) : (
              'Sign In'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default DemoUserLoginPage;

DemoUserLoginPage.propTypes = {
  isAdmin: PropTypes.bool,
};
