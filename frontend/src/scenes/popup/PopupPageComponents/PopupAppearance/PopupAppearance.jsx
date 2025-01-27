import { React } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import styles from './PopupAppearance.module.scss';
import ColorTextField from '@components/ColorTextField/ColorTextField';
import DropdownList from '@components/DropdownList/DropdownList';
import { apperanceSchema } from '../../../../utils/popupHelper';

const PopupAppearance = ({ data = [], setPopupSize, popupSize, onSave }) => {
  const initialValues = data.reduce((acc, { name, state }) => {
    acc[name] = state || '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={{ popupSize: popupSize.toLowerCase(), ...initialValues }}
      validationSchema={apperanceSchema}
      validateOnMount={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          onSave();
        } catch (error) {
          return;
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleBlur, validateField, setFieldValue }) => (
        <Form className={styles.container}>
          {data.map(({ name, label, state, setState }, key) => (
            <div key={key}>
              <h2>{label}</h2>
              <div className={styles.color}>
                <ColorTextField
                  name={name}
                  value={state}
                  error={Boolean(touched[name] && errors[name])}
                  onChange={(val) => {
                    setFieldValue(name, val);
                    setState(val);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    validateField(name);
                  }}
                />
              </div>
              {Boolean(touched[name] && errors[name]) && (
                <small
                  className={styles['popup-appearance-error']}
                  aria-live="polite"
                >
                  {errors[name]}
                </small>
              )}
            </div>
          ))}

          <h2 style={{ marginBottom: 0 }}>Popup Size</h2>
          <DropdownList
            actions={['Small', 'Medium', 'Large']}
            onActionChange={(value) => {
              const normalizedValue = value.toLowerCase();
              setPopupSize(normalizedValue);
              setFieldValue('popupSize', normalizedValue);
            }}
            selectedActionString={popupSize}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PopupAppearance;

PopupAppearance.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      setState: PropTypes.func.isRequired,
    })
  ).isRequired,
  setPopupSize: PropTypes.func.isRequired,
  popupSize: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};
