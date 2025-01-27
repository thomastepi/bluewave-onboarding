import { React } from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import styles from './PopupContent.module.scss';
import DropdownList from '@components/DropdownList/DropdownList';
import CustomTextField from '@components/TextFieldComponents/CustomTextField/CustomTextField';
import { popupContentSchema } from '../../../../utils/popupHelper';

const PopupContent = ({
  buttonRepetition,
  setButtonRepetition,
  action,
  setButtonAction,
  url,
  setUrl,
  actionButtonUrl,
  setActionButtonUrl,
  actionButtonText,
  setActionButtonText,
  onSave,
}) => {
  return (
    <Formik
      initialValues={{
        buttonRepetition,
        action,
        url,
        actionButtonUrl,
        actionButtonText,
      }}
      validateOnMount={false}
      enableReinitialize={true}
      validationSchema={popupContentSchema}
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
      {({
        errors,
        touched,
        handleBlur,
        handleChange,
        values,
        validateField,
        setFieldValue,
      }) => (
        <Form className={styles.container}>
          <h2 style={{ marginTop: '1.5rem' }}>Repetition</h2>
          <DropdownList
            actions={['Show only once', 'Show every visit']}
            onActionChange={(newRepetitionType) => {
              const normalizedValue = newRepetitionType.toLowerCase();
              setButtonRepetition(normalizedValue);
              setFieldValue('buttonRepetition', normalizedValue);
            }}
            selectedActionString={values.buttonRepetition}
          />

          <h2>Action</h2>
          <DropdownList
            actions={['No action', 'Open URL', 'Open URL in a new tab']}
            onActionChange={(newAction) => {
              const normalizedValue = newAction.toLowerCase();
              setButtonAction(normalizedValue);
              setFieldValue('action', normalizedValue);
            }}
            selectedActionString={values.action}
          />

          <h2 style={{ marginBottom: 0 }}>URL</h2>
          <CustomTextField
            TextFieldWidth="241px"
            name="url"
            value={values.url}
            error={Boolean(touched.url && errors.url)}
            onChange={(e) => {
              setUrl(e.target.value);
              handleChange(e);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('url');
            }}
          />
          {Boolean(touched.url && errors.url) && (
            <small className="error-message">{errors.url}</small>
          )}

          <h2 style={{ marginBottom: 0 }}>
            Action button URL (can be relative)
          </h2>
          <CustomTextField
            TextFieldWidth="241px"
            name="actionButtonUrl"
            value={values.actionButtonUrl}
            error={Boolean(touched.actionButtonUrl && errors.actionButtonUrl)}
            onChange={(e) => {
              setActionButtonUrl(e.target.value);
              handleChange(e);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('actionButtonUrl');
            }}
          />
          {Boolean(touched.actionButtonUrl && errors.actionButtonUrl) && (
            <small className="error-message">{errors.actionButtonUrl}</small>
          )}

          <h2 style={{ marginBottom: 0 }}>Action button text</h2>
          <CustomTextField
            TextFieldWidth="241px"
            value={values.actionButtonText}
            name="actionButtonText"
            error={errors.actionButtonText}
            onChange={(e) => {
              const newValue = e.target.value;
              setFieldValue('actionButtonText', newValue);
              setActionButtonText(newValue);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('actionButtonText');
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PopupContent;
PopupContent.propTypes = {
  actionButtonText: PropTypes.string,
  setActionButtonText: PropTypes.func,
  setActionButtonUrl: PropTypes.func,
  buttonAction: PropTypes.string,
  actionButtonUrl: PropTypes.string,
  setButtonAction: PropTypes.func,
  url: PropTypes.string,
  setUrl: PropTypes.func,
  buttonRepetition: PropTypes.string,
  setButtonRepetition: PropTypes.func,
  onSave: PropTypes.func.isRequired,
};
