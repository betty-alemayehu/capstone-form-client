// src/utils/validation.js

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

export const validateRequired = (value) => value.trim().length > 0;

export const validateSignUpForm = (form) => {
  const errors = {};

  if (!validateRequired(form.name)) errors.name = "Name is required.";
  if (!validateEmail(form.email)) errors.email = "Enter a valid email address.";
  if (!validatePassword(form.password))
    errors.password =
      "Password must have at least 8 characters, 1 letter, and 1 number.";
  if (!form.termsAccepted)
    errors.termsAccepted = "You must accept the Terms and Conditions.";

  return errors; // Returns an object with all validation errors
};
