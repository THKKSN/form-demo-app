import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/scss/formPage/FormPage.module.scss'; 

const RadioOption = ({ options, name, value, onChange }) => {
  return (
    <div>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.radioLabel} ${value === option.value ? styles.selected : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className={styles.hiddenRadio}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

RadioOption.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    label: PropTypes.string.isRequired,
  })).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  onChange: PropTypes.func.isRequired,
};

export default RadioOption;
