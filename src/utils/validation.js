// src/utils/validation.js
// Utility functions
export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Updated validatePassword to allow spaces
export const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password); // Removed [^\s] to allow spaces

export const validateRequired = (value) => value.trim().length > 0;

// Error messages as constants for reusability
const ERROR_MESSAGES = {
  nameRequired: "Name cannot be empty or contain only spaces.",
  nameTooShort: "Name must be at least 2 characters long.",
  emailRequired: "Email cannot be empty or contain only spaces.",
  emailInvalid: "Enter a valid email address.",
  passwordEmpty: "Password cannot be empty or contain only spaces.",
  passwordInvalid:
    "Password must be at least 8 characters, include 1 letter and 1 number.",
  termsNotAccepted: "You must accept the Terms and Conditions.",
};

// Shared validation for name
const validateName = (name) => {
  if (!validateRequired(name)) return ERROR_MESSAGES.nameRequired;
  if (name.trim().length < 2) return ERROR_MESSAGES.nameTooShort;
  return null; // No errors
};

// Shared validation for email
const validateEmailField = (email) => {
  if (!validateRequired(email)) return ERROR_MESSAGES.emailRequired;
  if (!validateEmail(email)) return ERROR_MESSAGES.emailInvalid;
  return null; // No errors
};

// Shared validation for password
export const validatePasswordField = (password, isRequired = false) => {
  if (isRequired && password.trim() === "") {
    return ERROR_MESSAGES.passwordEmpty;
  }
  // If password is provided (even if optional), validate its format
  if (password && !validatePassword(password)) {
    return ERROR_MESSAGES.passwordInvalid;
  }
  return null; // No errors
};

// Validation functions for specific forms
export const validateSignUpForm = (form) => {
  const errors = {};

  const nameError = validateName(form.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmailField(form.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePasswordField(form.password, true);
  if (passwordError) errors.password = passwordError;

  if (!form.termsAccepted)
    errors.termsAccepted = ERROR_MESSAGES.termsNotAccepted;

  return errors; // Returns an object with all validation errors
};

export const validateProfileForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmailField(formData.email);
  if (emailError) errors.email = emailError;

  // Validate password (not required but must be valid if provided)
  const passwordError = validatePasswordField(formData.password, false);
  if (passwordError) errors.password = passwordError;

  return errors; // Return the validation errors
};
