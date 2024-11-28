import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
}) => (
  <button className={`button button--${variant}`} type={type} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "link",
    "delete",
    "hidden",
  ]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
