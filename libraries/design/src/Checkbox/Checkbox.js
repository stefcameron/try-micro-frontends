import propTypes from 'prop-types';
import classnames from 'classnames';

import './Checkbox.css';

const displayName = 'Checkbox';
const compClassName = `design-${displayName.toLowerCase()}`;
let nextId = 1;

export const Checkbox = ({
  className,
  formValue,
  id,
  label,
  onChange,
  value,
}) => {
  const handleChange = (event) => {
    onChange?.(event, { newValue: event.target.checked });
  };

  const ctrlId = id || `${displayName.toLowerCase()}-${nextId++}`;

  return (
    <div
      data-component={displayName}
      className={classnames(compClassName, className)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <input
        type="checkbox"
        id={ctrlId}
        checked={value}
        onChange={handleChange}
        value={formValue}
      />
      <label htmlFor={ctrlId}>{label}</label>
    </div>
  );
};

Checkbox.propTypes = {
  className: propTypes.string,
  formValue: propTypes.string, // value included in a <form> if checked (default is 'on')
  id: propTypes.string,
  label: propTypes.string.isRequired,
  onChange: propTypes.func, // `(event: ChangeEvent, info: { newValue: boolean }) => void`
  value: propTypes.bool, // true/false INSTEAD OF `checked`
};
Checkbox.defaultProps = {
  value: false,
};
Checkbox.displayName = displayName;
