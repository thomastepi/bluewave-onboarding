import React from 'react';
import ColorTextField from '@components/ColorTextField/ColorTextField';
import { Formik, Form } from 'formik';
import { appearanceSchema } from '../../../../utils/bannerHelper';
import './BannerLeftAppearance.css';

const BannerLeftAppearance = ({
  backgroundColor,
  setBackgroundColor,
  fontColor,
  setFontColor,
}) => {
  return (
    <Formik
      initialValues={{ backgroundColor, fontColor }}
      validationSchema={appearanceSchema}
      validateOnBlur={false}
      validateOnMount={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          onSave();
        } catch (error) {
          console.error(error);
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
        setFieldValue,
      }) => (
        <Form className="banner-appearance-container">
          <div className="banner-appearance-item">
            <h2 className="banner-state-name">Background Color</h2>
            <div className="banner-appearance-color">
              <ColorTextField
                value={values.backgroundColor}
                name="backgroundColor"
                onChange={(val) => {
                  setFieldValue('backgroundColor', val);
                  setBackgroundColor(val);
                }}
                onBlur={handleBlur}
                error={errors.backgroundColor}
              />
            </div>
            {errors.backgroundColor && (
              <small className="banner-appearance-error">
                {errors.backgroundColor}
              </small>
            )}

            <h2 className="banner-state-name">Font Color</h2>
            <div className="banner-appearance-color">
              <ColorTextField
                value={values.fontColor}
                name="fontColor"
                onChange={(val) => {
                  setFieldValue('fontColor', val);
                  setFontColor(val);
                }}
                onBlur={handleBlur}
                error={errors.fontColor}
              />
            </div>
            {errors.fontColor && (
              <small className="banner-appearance-error">
                {errors.fontColor}
              </small>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BannerLeftAppearance;
