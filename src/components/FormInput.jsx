//FormInput.jsx
import React from "react";
import PropTypes from "prop-types";
import "./FormInput.scss";

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="form-input">
    {label && <label className="form-input__label">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-input__input ${error ? "form-input__input--error" : ""}`}
    />
    {error && (
      <span className="form-input__error">
        <img
          src="/assets/icons/error-24px.svg"
          alt="Error"
          className="form-input__error-icon"
        />
        {error}
      </span>
    )}
  </div>
);
//FYI - this is the proptypes definition, used to validate the types and requirements of the props passed to the FormInput component
//connect to typeScript lecture with Jim
FormInput.propTypes = {
  label: PropTypes.string, //The label prop must be a string. It is optional (not marked as isRequired).
  type: PropTypes.string, //The type prop must be a string, commonly used to define the input type (e.g., text, password). It is also optional.
  value: PropTypes.string.isRequired, //The value prop must be a string and is required. This ensures the component always receives a value prop.
  onChange: PropTypes.func.isRequired, //The onChange prop must be a function and is required. Typically used for handling input changes.
  error: PropTypes.string, //The error prop must be a string. It is optional and likely used to display validation error messages.
  placeholder: PropTypes.string, //The placeholder prop must be a string. It is optional and typically used to provide placeholder text in the input field.
};

export default FormInput;
