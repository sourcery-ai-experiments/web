import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import { BounceIt } from "../bounce-it.jsx";
import { Link } from 'react-router-dom';


export const ButtonStyles = [
  'outline',
  'basic',
  'plain',
  'primary',
  'primary-outline',
  'secondary',
  'secondary-outline',
  'critical',
  'critical-outline',
  'primary-plain',
  'secondary-plain',
  'critical-plain',
]
export const IconButtonStyles = [
  'outline',
  'basic',
  'plain'
]

export const ButtonBase = ({
  style,
  size = "medium",
  onClick,
  href,
  label,
  type,
  disabled,
  sharpLeft = false,
  sharpRight = false,
  noBorder,
  className,
  noRounded,
  noRing,
  IconComp,
  DisclosureComp,
  iconOnly = false,
  selected = false
}) => {
  if (href) {
    return (
      <BounceIt disable={disabled} className='focus-within:z-10'>
        <Link
          to={href}
          className={classnames(
            className,
            {
              "bodyMd-medium": style !== "primary-plain" && style !== "secondary-plain" && style !== "critical-plain" && style !== "plain",
              "bodyMd": style === "primary-plain" || style === "secondary-plain" || style !== "critical-plain" || style !== "plain",
            },
            "ring-offset-1",
            "outline-none shadow-button",
            "flex gap-2 items-center",
            {
              ...(noRing ? {} : {
                "focus-visible:ring-2 focus:ring-border-focus": true,
              })
            },
            {
              ...(noRounded ? {} : {
                "rounded-none": sharpLeft && sharpRight,
                "rounded-r": sharpLeft && !sharpRight,
                "rounded-l": !sharpLeft && sharpRight,
                "rounded": !sharpLeft && !sharpRight,
              })
            },
            "transition-all",
            "disabled:pointer-events-none",
            {
              ...(noBorder ? { "border-none": true } : {
                "border-border-default disabled:border-border-disabled": style === "basic" || style === "outline",
                "border-border-primary disabled:border-border-disabled": style === "primary" || style === "primary-outline",
                "border-border-secondary disabled:border-border-disabled": style === "secondary" || style === "secondary-outline",
                "border-border-danger disabled:border-border-disabled": style === "critical-outline" || style === "critical",
                "border-none": style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
                "border": !(style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain"),
              })
            },
            {
              "bg-surface-default hover:bg-surface-hovered active:bg-surface-pressed": style === "basic",
              "bg-surface-pressed hover:bg-surface-hovered active:bg-surface-pressed": style === "basic" && selected,
              "bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-default": style === "primary",
              "bg-surface-primary-pressed hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-default": style === "primary" && selected,
              "bg-surface-secondary-default hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-default": style === "secondary",
              "bg-surface-secondary-pressed hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-default": style === "secondary" && selected,
              "bg-surface-danger-default hover:bg-surface-danger-hovered active:bg-surface-danger-pressed disabled:bg-surface-default": style === "critical",
              "bg-surface-danger-pressed hover:bg-surface-danger-hovered active:bg-surface-danger-pressed disabled:bg-surface-default": style === "critical" && selected,
              "bg-none shadow-none hover:bg-surface-danger-subdued active:bg-surface-danger-selected hover:shadow-button active:shadow-button": style === "critical-outline" || (style === "critical-plain" && iconOnly),
              "bg-none shadow-none hover:bg-surface-primary-subdued active:bg-surface-primary-selected hover:shadow-button active:shadow-button": style === "primary-outline" || (style === "primary-plain" && iconOnly),
              "bg-none shadow-none hover:bg-surface-secondary-subdued active:bg-surface-secondary-selected hover:shadow-button active:shadow-button": style === "secondary-outline" || (style === "secondary-plain" && iconOnly),
              "bg-none shadow-none hover:bg-surface-hovered active:bg-surface-pressed hover:shadow-button active:shadow-button": style === "outline" || (style === "plain" && iconOnly),
              "bg-none shadow-none active:bg-surface-pressed active:shadow-button": style === "plain" && !iconOnly,
              "bg-none shadow-none active:bg-surface-primary-pressed active:shadow-button": style === "primary-plain" && !iconOnly,
              "bg-none shadow-none active:bg-surface-secondary-pressed active:shadow-button": style === "secondary-plain" && !iconOnly,
              "bg-none shadow-none active:bg-surface-danger-pressed active:shadow-button": style === "critical-plain" && !iconOnly,
            },
            {
              "text-text-default disabled:text-text-disable": style === "basic" || style === "plain" || style === "outline",
              "active:text-text-on-primary": (style === "primary-plain" || style === "critical-plain" || style === "secondary-plain") && !iconOnly,
              "text-text-on-primary disabled:text-text-disabled": style === "primary" || style === "critical" || style === "secondary",
              "text-text-danger disabled:text-text-disabled": style === "critical-outline" || style === "critical-plain",
              "text-text-primary disabled:text-text-disabled": style === "primary-outline" || style === "primary-plain",
              "text-text-secondary disabled:text-text-disabled": style === "secondary-outline" || style === "secondary-plain",
            },
            {
              "focus:underline": noRing
            },
            {
              "hover:underline": style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
            },
            {
              "px-6 py-3": size === "large" && style !== "plain" && style !== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
              "px-4 py-2": size === "medium" && style !== "plain" && style !== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
              "px-2 py-1": size === "small" && style !== "plain" && style !== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
              "px-1 py-0.5": style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
            }
          )}
          onClick={onClick}
          href={href}
        >
          {IconComp && <IconComp size={16} color="currentColor" />}
          {label}
          {DisclosureComp && <DisclosureComp size={16} color="currentColor" />}
        </Link>
      </BounceIt>
    )
  }
  return (
    <BounceIt disable={disabled} className='focus-within:z-10 relative'>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}

        className={classnames(
          className,
          {
            "bodyMd-medium": style !== "primary-plain" && style !== "secondary-plain" && style !== "critical-plain" && style !== "plain",
            "bodyMd": style === "primary-plain" || style === "secondary-plain" || style !== "critical-plain" || style !== "plain",
          },
          "ring-offset-1",
          "outline-none shadow-button",
          "flex gap-2 items-center",
          {
            ...(noRing ? {} : {
              "focus-visible:ring-2 focus:ring-border-focus": true,
            })
          },
          {
            ...(noRounded ? {} : {
              "rounded-none": sharpLeft && sharpRight,
              "rounded-r": sharpLeft && !sharpRight,
              "rounded-l": !sharpLeft && sharpRight,
              "rounded": !sharpLeft && !sharpRight,
            })
          },
          "transition-all",
          "disabled:pointer-events-none",
          {
            ...(noBorder ? { "border-none": true } : {
              "border-border-default disabled:border-border-disabled": style === "basic" || style === "outline",
              "border-border-primary disabled:border-border-disabled": style === "primary" || style === "primary-outline",
              "border-border-secondary disabled:border-border-disabled": style === "secondary" || style === "secondary-outline",
              "border-border-danger disabled:border-border-disabled": style === "critical-outline" || style === "critical",
              "border-none": style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
              "border": !(style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain"),
            })
          },
          {
            "bg-surface-default hover:bg-surface-hovered active:bg-surface-pressed": style === "basic" && !selected,
            "bg-surface-pressed hover:bg-surface-pressed active:bg-surface-pressed": style === "basic" && selected & !iconOnly,
            "bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-default": style === "primary",
            "bg-surface-primary-pressed hover:bg-surface-primary-pressed active:bg-surface-primary-pressed disabled:bg-surface-default": style === "primary" && selected,
            "bg-surface-secondary-default hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-default": style === "secondary",
            "bg-surface-secondary-pressed hover:bg-surface-secondary-pressed active:bg-surface-secondary-pressed disabled:bg-surface-default": style === "secondary" && selected,
            "bg-surface-danger-default hover:bg-surface-danger-hovered active:bg-surface-danger-pressed disabled:bg-surface-default": style === "critical",
            "bg-surface-danger-pressed hover:bg-surface-danger-pressed active:bg-surface-danger-pressed disabled:bg-surface-default": style === "critical" && selected,
            "bg-none shadow-none hover:bg-surface-danger-subdued active:bg-surface-danger-selected hover:shadow-button active:shadow-button": style === "critical-outline" || (style === "critical-plain" && iconOnly),
            "bg-surface-danger-selected shadow-none hover:bg-surface-danger-selected active:bg-surface-danger-selected hover:shadow-button active:shadow-button": (style === "critical-outline" || (style === "critical-plain" && iconOnly)) && selected,
            "bg-none shadow-none hover:bg-surface-primary-subdued active:bg-surface-primary-selected hover:shadow-button active:shadow-button": style === "primary-outline" || (style === "primary-plain" && iconOnly),
            "bg-surface-primary-selected shadow-none hover:bg-surface-primary-selected active:bg-surface-primary-selected hover:shadow-button active:shadow-button": (style === "primary-outline" || (style === "primary-plain" && iconOnly)) && selected,
            "bg-none shadow-none hover:bg-surface-secondary-subdued active:bg-surface-secondary-selected hover:shadow-button active:shadow-button": style === "secondary-outline" || (style === "secondary-plain" && iconOnly),
            "bg-surface-secondary-selected shadow-none hover:bg-surface-secondary-selected active:bg-surface-secondary-selected hover:shadow-button active:shadow-button": (style === "secondary-outline" || (style === "secondary-plain" && iconOnly)) && selected,
            "bg-none shadow-none hover:bg-surface-hovered active:bg-surface-pressed hover:shadow-button active:shadow-button": (style === "outline" && !selected) || (style === "plain" && iconOnly && !selected),
            "bg-none shadow-none hover:bg-none active:bg-none hover:shadow-none active:shadow-none": (style === "outline" && iconOnly && selected),
            "bg-surface-pressed shadow-none hover:bg-surface-pressed active:bg-surface-pressed hover:shadow-button active:shadow-button": style === "outline" && selected && !iconOnly,
            "bg-none shadow-none active:bg-surface-pressed active:shadow-button": style === "plain" && !iconOnly,
            "bg-surface-pressed shadow-none active:bg-surface-pressed active:shadow-button": style === "plain" && !iconOnly && selected,
            "bg-none shadow-none active:bg-surface-primary-pressed active:shadow-button": style === "primary-plain" && !iconOnly,
            "bg-surface-primary-pressed shadow-none active:bg-surface-primary-pressed active:shadow-button": style === "primary-plain" && !iconOnly && selected,
            "bg-none shadow-none active:bg-surface-secondary-pressed active:shadow-button": style === "secondary-plain" && !iconOnly,
            "bg-surface-secondary-pressed shadow-none active:bg-surface-secondary-pressed active:shadow-button": style === "secondary-plain" && !iconOnly && selected,
            "bg-none shadow-none active:bg-surface-danger-pressed active:shadow-button": style === "critical-plain" && !iconOnly,
            "bg-surface-danger-pressed shadow-none active:bg-surface-danger-pressed active:shadow-button": style === "critical-plain" && !iconOnly && selected,
            "bg-none shadow-none hover:bg-none": style === "plain" && iconOnly && selected,
          },
          {
            "text-text-default disabled:text-text-disable": (style === "basic" || style === "plain" || style === "outline") && !(selected && iconOnly),
            "active:text-text-on-primary": (style === "primary-plain" || style === "critical-plain" || style === "secondary-plain") && !iconOnly,
            "text-text-on-primary disabled:text-text-disabled": style === "primary" || style === "critical" || style === "secondary",
            "text-text-danger disabled:text-text-disabled": ((style === "critical-outline") && selected) || ((style === "critical-outline" || style === "critical-plain") && !selected),
            "text-text-primary disabled:text-text-disabled": ((style === "primary-outline") && selected) || ((style === "primary-outline" || style === "primary-plain") && !selected),
            "text-text-secondary disabled:text-text-disabled": ((style === "secondary-outline") && selected) || ((style === "secondary-outline" || style === "secondary-plain") && !selected),
            "text-text-on-primary": (style === "critical-plain" || style === "primary-plain" || style === "secondary-plain") && selected && !iconOnly,
            "text-icon-primary": selected && iconOnly
          },
          {
            "focus:underline": noRing
          },
          {
            "hover:underline": style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
          },
          {
            ...(iconOnly ? {
              "p-3": size === "large",
              "p-2": size === "medium",
              "p-1": size === "small"
            } : {
              "px-6 py-3": size === "large" && style !== "plain" && style !== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
              "px-4 py-2": size === "medium" && style !== "plain" && style !== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
              "px-2 py-1": size === "small" && style !== "plain" && style !== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
              "px-1 py-0.5": style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
            })
          }
        )}
        href={href}
      >
        {IconComp && <IconComp size={iconOnly ? 20 : 16} color="currentColor" />}
        {!iconOnly && label}
        {DisclosureComp && !iconOnly && <DisclosureComp size={16} color="currentColor" />}
      </button>
    </BounceIt>
  );
};


export const IconButton = ({
  style,
  size = "medium",
  onClick,
  href,
  type,
  disabled,
  sharpLeft = false,
  sharpRight = false,
  className,
  noRounded,
  noRing,
  IconComp,
  selected,
}) => {
  return <ButtonBase selected={selected} iconOnly={true} label={''} style={style} size={size} onClick={onClick} href={href} type={type} disabled={disabled} sharpLeft={sharpLeft} sharpRight={sharpRight} noRing={noRing} noRounded={noRounded} IconComp={IconComp} className={className} />
}


export const Button = ({
  label,
  style,
  size = "medium",
  onClick,
  href,
  type,
  disabled,
  sharpLeft = false,
  sharpRight = false,
  className,
  noRounded,
  noBorder,
  noRing,
  IconComp,
  DisclosureComp,
}) => {
  return <ButtonBase label={label} noBorder={noBorder} DisclosureComp={DisclosureComp} style={style} size={size} onClick={onClick} href={href} type={type} disabled={disabled} sharpLeft={sharpLeft} sharpRight={sharpRight} noRing={noRing} noRounded={noRounded} IconComp={IconComp} className={className} />
}

Button.propTypes = {
  /**
   * How the button looks like?
   */
  style: PropTypes.oneOf([
    'outline',
    'basic',
    'plain',
    'primary',
    'primary-outline',
    'secondary',
    'secondary-outline',
    'critical',
    'critical-outline',
    'primary-plain',
    'secondary-plain',
    'critical-plain',
  ]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Href for link
   */
  href: PropTypes.string,
  /**
   * Disable button
   */
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
};

Button.defaultProps = {
  style: 'primary',
  size: 'medium',
  onClick: undefined,
  link: false,
  type: "button",
};



IconButton.propTypes = {
  /**
   * How the button looks like?
   */
  style: PropTypes.oneOf(IconButtonStyles),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Href for link
   */
  href: PropTypes.string,
  /**
   * Disable button
   */
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  selected: PropTypes.bool
};

IconButton.defaultProps = {
  style: 'basic',
  size: 'medium',
  onClick: undefined,
  link: false,
  type: "button",
  selected: false
};
