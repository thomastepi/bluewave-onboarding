import PropTypes from 'prop-types';
import { useField } from 'formik';
import styles from './ColorInput.module.scss';

const ColorInput = ({ id, title, className, ...props }) => {
  // To thread formik behaviour into custom field
  const [field, meta, helpers] = useField(props.name);
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={id} className={styles.appearance__label}>
      {title}
      <div className={styles.appearance__color}>
        <input
          type="text"
          {...field}
          value={field.value}
          onChange={handleChange}
          className={`${styles.appearance__input} ${
            className ? styles[className] : ''
          } ${error && touched ? styles.error : ''}`}
          onBlur={() => setTouched(true)}
        />
        <div className={styles.appearance__circle}>
          <input
            type="color"
            id={id}
            value={field.value}
            onChange={handleChange}
            style={{ zIndex: 10, cursor: 'pointer', opacity: 0 }}
            onBlur={() => setTouched(true)}
          />
          {error && touched ? (
            <img
              src="/no-background.jpg"
              alt="No color selected"
              className={styles['appearance__circle--mask']}
            />
          ) : (
            <span
              className={styles['appearance__circle--mask']}
              style={{ backgroundColor: field.value }}
            />
          )}
        </div>
      </div>
      {error && touched && (
        <small className={styles['appearance__error']} aria-live="polite">
          {error}
        </small>
      )}
    </label>
  );
};

ColorInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default ColorInput;
