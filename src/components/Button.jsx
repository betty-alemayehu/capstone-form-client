//Button.jsx
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  className = "",
}) => (
  <button
    className={`button button--${variant} ${className}`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "delete",
    "hidden",
  ]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
