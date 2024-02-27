import propTypes from 'prop-types';
import classnames from 'classnames';

const displayName = 'Button';
const compClassName = `design-${displayName.toLowerCase()}`;
let nextId = 1;

export const Button = ({ className, id, label, onClick }) => {
  const handleClick = (event) => {
    onClick?.(event, { newValue: event.target.checked });
  };

  const ctrlId = id || `${displayName.toLowerCase()}-${nextId++}`;

  return (
    <div
      data-component={displayName}
      className={classnames(compClassName, className)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button id={ctrlId} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
};

Button.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  label: propTypes.string.isRequired,
  onClick: propTypes.func, // `(event: MouseEvent) => void`
};
Button.defaultProps = {
  value: false,
};
Button.displayName = displayName;
