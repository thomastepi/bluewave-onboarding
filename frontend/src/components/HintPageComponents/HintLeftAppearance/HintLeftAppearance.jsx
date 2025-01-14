import React, { useMemo } from "react";
import ColorTextField from "../../ColorTextField/ColorTextField";
import "./HintLeftAppearance.css";
  import { Formik, useFormikContext, Form } from "formik";
  import * as Yup from "yup";

const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const validationSchema = Yup.object({
  headerBackgroundColor: Yup.string()
  .required("Header background color is required")
  .matches(colorRegex,"Header background must be a valid hex color"),

  headerColor: Yup.string()
  .required("Header color is required")
  .matches(colorRegex,"Header color must be a valid hex color"),

  textColor: Yup.string()
  .required("Text color is required")
  .matches(colorRegex,"Text color must be a valid hex color"),

  buttonBackgroundColor: Yup.string()
  .required("Button background color is required")
  .matches(colorRegex,"Button background must be a valid hex color"),

  buttonTextColor: Yup.string()
  .required("Button text color is required")
  .matches(colorRegex,"Button text color must be a valid hex color"),
});

const HintLeftAppearance = ({ data = [] }) => {
  const content = useMemo(() => {
    if (data.length === 0) {
      return <div className="hint-appearance-container">No data available</div>;
    }
    return (
      <div className="hint-appearance-container">
        {data.map(({ stateName, state, setState }) => (
          <div key={stateName}>
            <h2 className="hint-state-name">{stateName}</h2>
            <div className="hint-appearance-color">
              <ColorTextField value={state} onChange={setState} />
            </div>
          </div>
        ))}
      </div>
    );
  }, [data]);

  return content;
};

export default HintLeftAppearance;
