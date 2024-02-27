import propTypes from 'prop-types';
import classnames from 'classnames';

import './TextInput.css';

const displayName = 'TextInput';
const compClassName = `design-${displayName.toLowerCase()}`;
let nextId = 1;

export const TextInput = ({ className, id, label, onChange, value }) => {
  const handleChange = (event) => {
    onChange?.(event, { newValue: event.target.value });
  };

  const ctrlId = id || `${displayName.toLowerCase()}-${nextId++}`;

  return (
    <div
      data-component={displayName}
      className={classnames(compClassName, className)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <label htmlFor={ctrlId}>{label}</label>
      <input
        type="text"
        style={{ width: 100 }}
        id={ctrlId}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

TextInput.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  label: propTypes.string.isRequired,
  onChange: propTypes.func, // `(event: ChangeEvent, info: { newValue: string }) => void`
  value: propTypes.string,
};
TextInput.defaultProps = {};
TextInput.displayName = displayName;
