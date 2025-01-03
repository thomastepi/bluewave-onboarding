import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { HelperLinkContext } from '../../../services/linksProvider';
import { appearanceSchema } from '../../../utils/linkHelper';
import styles from '../LinkPage.module.scss';

const LinkAppearance = ({ handleSaveHelper }) => {
  const [serverErrors, setServerErrors] = useState([]);
  const context = useContext(HelperLinkContext);
  if (!context) {
    throw new Error('LinkAppearance must be used within a HelperLinkProvider');
  }

  const { helper, setHelper } = context;

  useEffect(() => {
    document.querySelector('#header').focus();
  }, []);

  const handleHelperChange = (e) => {
    const { name, value } = e.target;
    setHelper((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Formik
      initialValues={helper}
      validationSchema={appearanceSchema}
      validateonMount={false}
      validateonBlur={true}
      onSubmit={async (values, { setSubmitting }) => {
        setServerErrors([]);
        try {
          handleSaveHelper();
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
      {({
        isSubmitting,
        touched,
        errors,
        handleChange,
        handleBlur,
        values,
      }) => (
        <Form className={styles.appearance}>
          <label htmlFor="header" className={styles.appearance__label}>
            Header text{' '}
            <input
              type="text"
              id="header"
              className={`${styles.appearance__input} ${
                errors.title && styles.error
              }`}
              name="title"
              value={values.title || ''}
              onChange={(e) => {
                handleChange(e);
                handleHelperChange(e);
              }}
              onBlur={(e) => {
                handleBlur(e);
                handleHelperChange(e);
              }}
            />
          </label>
          <label htmlFor="header-bg" className={styles.appearance__label}>
            Header background color{' '}
            <div className={styles.appearance__color}>
              <span
                className={`${styles.appearance__input} ${styles.header} ${
                  errors.headerBackgroundColor && styles.error
                }`}
              >
                {values.headerBackgroundColor}
              </span>
              <div className={styles.appearance__circle}>
                <input
                  type="color"
                  id="header-bg"
                  name="headerBackgroundColor"
                  value={values.headerBackgroundColor || '#F8F9F8'}
                  onChange={(e) => {
                    handleChange(e);
                    handleHelperChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleHelperChange(e);
                  }}
                />
                <span
                  className={styles['appearance__circle--mask']}
                  style={{ backgroundColor: values.headerBackgroundColor }}
                />
              </div>
            </div>
          </label>
          <label htmlFor="link-color" className={styles.appearance__label}>
            Link font color{' '}
            <div className={styles.appearance__color}>
              <span
                className={`${styles.appearance__input} ${styles.link} ${
                  errors.linkFontColor && styles.error
                }`}
              >
                {values.linkFontColor || '#344054'}
              </span>
              <div className={styles.appearance__circle}>
                <input
                  type="color"
                  id="link-color"
                  name="linkFontColor"
                  value={values.linkFontColor || '#344054'}
                  onChange={(e) => {
                    handleChange(e);
                    handleHelperChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleHelperChange(e);
                  }}
                />
                <span
                  className={styles['appearance__circle--mask']}
                  style={{ backgroundColor: values.linkFontColor }}
                />
              </div>
            </div>
          </label>
          <label htmlFor="icon" className={styles.appearance__label}>
            Helper icon color{' '}
            <div className={styles.appearance__color}>
              <span
                className={`${styles.appearance__input} ${styles.icon} ${
                  errors.iconColor && styles.error
                }`}
              >
                {values.iconColor}
              </span>
              <div className={styles.appearance__circle}>
                <input
                  type="color"
                  id="icon"
                  name="iconColor"
                  value={values.iconColor || '#7F56D9'}
                  onChange={(e) => {
                    handleChange(e);
                    handleHelperChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleHelperChange(e);
                  }}
                />
                <span
                  className={styles['appearance__circle--mask']}
                  style={{ backgroundColor: helper.iconColor }}
                />
              </div>
            </div>
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default LinkAppearance;
