import { Form, Formik } from 'formik';
import React from 'react';
import { newHintSchema } from '../../../utils/hintHelper';
import DropdownList from '../../DropdownList/DropdownList';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';
import './HintLeftContent.css';
import Switch from '../../Switch/Switch';

const HintLeftContent = ({
  actionButtonText,
  setActionButtonText,
  actionButtonUrl,
  setActionButtonUrl,
  action,
  setAction,
  targetElement,
  setTargetElement,
  tooltipPlacement,
  setTooltipPlacement,
  setUrl,
  url,
  isHintIconVisible,
  enableHintIcon,
  onSave,
}) => {
  const handleActionButtonText = (event) => {
    setActionButtonText(event.target.value);
  };
  const handleActionButtonUrl = (event) => {
    setActionButtonUrl(event.target.value);
  };
  const handleUrl = (event) => {
    setUrl(event.target.value);
  };
  const handleActionChange = (newAction) => {
    setAction(newAction);
  };

  const handleTargetElement = (event) => {
    setTargetElement(event.target.value);
  };

  const handleTooltipPlacement = (newAction) => {
    setTooltipPlacement(newAction);
  };

  const handleHintIcon = (event) => {
    enableHintIcon(event.target.checked);
  };

  return (
    <Formik
      initialValues={{
        url,
        action,
        actionButtonUrl,
        actionButtonText,
        targetElement,
        tooltipPlacement,
      }}
      validationSchema={newHintSchema}
      validateOnMount={false}
      validateOnBlur={false}
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
        isSubmitting,
        errors,
        handleChange,
        handleBlur,
        values,
        validateField,
      }) => (
        <Form className="left-content-container">
          <h2
            className="hint-label"
            style={{ marginBottom: 0, marginTop: '16px' }}
          >
            Url (can be relative)
          </h2>
          <CustomTextField
            TextFieldWidth="241px"
            error={!!errors.url}
            name="url"
            value={values.url}
            onChange={(e) => {
              handleUrl(e);
              handleChange(e);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('url');
            }}
          />
          {errors.url && <small className="error-message">{errors.url}</small>}
          <h2 className="hint-label" style={{ marginTop: '16px' }}>
            Action
          </h2>
          <DropdownList
            actions={['No action', 'Open URL', 'Open URL in a new tab']}
            onActionChange={(e) => {
              handleActionChange(e);
              handleChange(e);
            }}
            selectedActionString={values.action.toLowerCase()}
          />
          <h2
            className="hint-label"
            style={{ marginBottom: 0, marginTop: '16px' }}
          >
            Action button url (can be relative)
          </h2>
          <CustomTextField
            TextFieldWidth="241px"
            value={values.actionButtonUrl}
            name="actionButtonUrl"
            error={errors.actionButtonUrl}
            onChange={(e) => {
              handleActionButtonUrl(e);
              handleChange(e);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('actionButtonUrl');
            }}
          />
          {errors.actionButtonUrl && (
            <small className="error-message">{errors.actionButtonUrl}</small>
          )}
          <h2 className="hint-label" style={{ marginBottom: 0 }}>
            Action button text
          </h2>
          <CustomTextField
            TextFieldWidth="241px"
            value={values.actionButtonText}
            name="actionButtonText"
            error={errors.actionButtonText}
            onChange={(e) => {
              handleActionButtonText(e);
              handleChange(e);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('actionButtonText');
            }}
          />
          {errors.actionButtonText && (
            <small className="error-message">{errors.actionButtonText}</small>
          )}
          <h2 className="hint-label" style={{ marginBottom: 0 }}>
            Target Element
          </h2>
          <CustomTextField
            TextFieldWidth="241px"
            value={values.targetElement}
            error={errors.targetElement}
            name="targetElement"
            onChange={(e) => {
              handleTargetElement(e);
              handleChange(e);
            }}
            onBlur={(e) => {
              handleBlur(e);
              validateField('targetElement');
            }}
            helperText="Page element to attach tooltip to"
          />
          {errors.targetElement && (
            <small className="error-message">{errors.targetElement}</small>
          )}
          <h2 className="hint-label">Tooltip Placement</h2>
          <DropdownList
            actions={['Top', 'Right', 'Bottom', 'Left']}
            onActionChange={(e) => {
              handleTooltipPlacement(e);
              handleChange(e);
            }}
            selectedActionString={values.tooltipPlacement}
          />

          <div className="switch-style">
            <Switch
              id="switch"
              name="target"
              onChange={(e) => {
                handleHintIcon(e);
                handleChange(e);
              }}
              value={isHintIconVisible}
            />
            <span style={{ fontSize: 'var(--font-regular)' }}>
              Enable hint icon
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HintLeftContent;
