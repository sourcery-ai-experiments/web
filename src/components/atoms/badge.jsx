import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import BounceIt from "../bounce-it.jsx";



/**
 * Button component for user interaction
 */
export const Badge = ({label, disabled, selected, onChange, leftIcon, rightIcon}) => {
  const [selectedState, setSelectedState] = React.useState(selected)
  React.useEffect(()=> {
    onChange(selectedState);
  }, [selectedState])
  return (
    <BounceIt>
      <div className={classnames("rounded-full border bodyMd flex gap-0.5 px-3 py-1 cursor-pointer transition-all",
        {
          "border-border-default":!selected,
          "border-primary":selected,
          "bg-surface-primary-pressed":selected,
          "bg-surface":!selected,
          "text-text-on-primary":selected,
          "text-text-disabled":disabled,
          "pointer-events-none":disabled,
        }
        )} onClick={()=> {
        setSelectedState(()=> {
          return !selectedState
        })
      }}>
        {leftIcon}
        {label}
        {rightIcon}
      </div>
    </BounceIt>
  );
};

Badge.propTypes = {

  label: PropTypes.string.isRequired,

  selected: PropTypes.bool,

  onChange: PropTypes.func,

  disabled: PropTypes.bool,
};

Badge.defaultProps = {
  label: "test",
  selected: false,
  onChange: () => {},
  disabled: false,
};