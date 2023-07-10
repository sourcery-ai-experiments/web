import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import { DefaultLinkComp } from './_link';
import { BounceIt } from '../bounce-it';

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

export const AriaButton = "button"

export const ButtonBase = forwardRef(({
  variant,
  onClick,
  href,
  content,
  type,
  disabled,
  sharpLeft = false,
  sharpRight = false,
  noBorder,
  className,
  noRounded,
  noRing,
  prefix,
  iconOnly = false,
  suffix,
  selected = false,
  block = false,
  LinkComponent = DefaultLinkComp,
  ...props
}, ref) => {

  let Component = "button"
  let extraProps = {}

  extraProps.onClick = onClick

  if (href) {
    Component = LinkComponent
    extraProps.to = href
  } else {
    extraProps.disabled = disabled
  }

  let Suffix = suffix
  let Prefix = prefix

  return (
    <Component
      ref={ref}
      type={type}
      className={classnames(
        {
          "w-full": block,
          "w-fit": !block
        },
        {
          "bodyMd-medium": variant !== "primary-plain" && variant !== "secondary-plain" && variant !== "critical-plain" && variant !== "plain",
          "bodyMd": variant === "primary-plain" || variant === "secondary-plain" || variant !== "critical-plain" || variant !== "plain",
        },
        "relative ring-offset-1",
        "outline-none shadow-button",
        "flex flex-row gap-2 items-center justify-center",
        "disabled:text-text-disabled",
        {
          ...(noRing ? {} : {
            "focus-visible:ring-2 focus:ring-border-focus focus:z-10": true
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
            "border-border-default disabled:border-border-disabled": variant === "basic" || variant === "outline",
            "border-border-primary disabled:border-border-disabled": variant === "primary" || variant === "primary-outline",
            "border-border-secondary disabled:border-border-disabled": variant === "secondary" || variant === "secondary-outline",
            "border-border-critical disabled:border-border-disabled": variant === "critical-outline" || variant === "critical",
            "border-none": variant === "plain" || variant === "primary-plain" || variant === "critical-plain" || variant === "secondary-plain",
            "border": !(variant === "plain" || variant === "primary-plain" || variant === "critical-plain" || variant === "secondary-plain"),
          })
        },
        {
          "bg-surface-default hover:bg-surface-hovered active:bg-surface-pressed disabled:bg-surface-default": variant === "basic",
          "bg-surface-pressed hover:bg-surface-pressed active:bg-surface-pressed disabled:bg-surface-default": variant === "basic" && selected,
          "bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-default": variant === "primary",
          "bg-surface-secondary-default hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-default": variant === "secondary",
          "bg-surface-critical-default hover:bg-surface-critical-hovered active:bg-surface-critical-pressed disabled:bg-surface-default": variant === "critical",
          "bg-none hover:bg-surface-critical-subdued active:bg-surface-critical-subdued": variant === "critical-outline",
          "bg-none hover:bg-surface-primary-subdued active:bg-surface-primary-subdued": variant === "primary-outline",
          "bg-none hover:bg-surface-secondary-subdued active:bg-surface-secondary-subdued": variant === "secondary-outline",
          "bg-none hover:bg-surface-hovered active:bg-surface-pressed": variant === "outline",
          "bg-surface-pressed shadow-none hover:bg-surface-hovered active:bg-surface-pressed hover:shadow-button active:shadow-button": variant === "outline" && selected,
          "bg-none shadow-none active:bg-surface-pressed active:shadow-button": variant === "plain" && !iconOnly,
          "bg-none shadow-none active:bg-surface-primary-pressed active:shadow-button": variant === "primary-plain",
          "bg-none shadow-none active:bg-surface-secondary-pressed active:shadow-button": variant === "secondary-plain",
          "bg-none shadow-none active:bg-surface-critical-pressed active:shadow-button": variant === "critical-plain",
          "bg-none shadow-none hover:bg-surface-hovered active:bg-surface-pressed active:shadow-button": variant === "plain" && iconOnly,
        },
        {
          "text-text-default": (variant === "basic" || variant === "plain" || variant === "outline"),
          "active:text-text-on-primary": (variant === "primary-plain" || variant === "critical-plain" || variant === "secondary-plain"),
          "text-text-on-primary": variant === "primary" || variant === "critical" || variant === "secondary" || variant === "secondary-outline",
          "text-text-critical hover": (variant === "critical-outline" || variant === "critical-plain"),
          "text-text-primary": (variant === "primary-outline" || variant === "primary-plain"),
          "text-text-secondary": variant === "secondary-plain" || variant === "secondary-outline",
        },
        {
          "focus:underline": noRing
        },
        {
          "hover:underline": variant === "plain" || variant === "primary-plain" || variant === "critical-plain" || variant === "secondary-plain",
        },
        {
          "px-4 py-2": !iconOnly && !(variant === "plain" || variant === "primary-plain" || variant === "critical-plain" || variant === "secondary-plain"),
          "px-1 py-0.5": !iconOnly && (variant === "plain" || variant === "primary-plain" || variant === "critical-plain" || variant === "secondary-plain"),
          "p-2": iconOnly
        },
        className
      )}
      {...props}
      {...extraProps}
    >
      {prefix && <Prefix size={iconOnly ? 20 : 16} color="currentColor" />}
      {!iconOnly && content}
      {suffix && !iconOnly && <Suffix size={16} color="currentColor" />}
    </Component>
  );
})


export const IconButton = forwardRef(({
  variant,
  onClick,
  href,
  type,
  disabled,
  sharpLeft = false,
  sharpRight = false,
  className,
  noRounded,
  noRing,
  icon,
  ...props
}, ref) => {

  return <ButtonBase {...props} ref={ref} iconOnly={true} label={''} variant={variant} onClick={onClick} href={href} type={type} disabled={disabled} sharpLeft={sharpLeft} sharpRight={sharpRight} noRing={noRing} noRounded={noRounded} prefix={icon} className={className} />
})



export const Button = forwardRef(({
  content,
  variant,
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
  prefix,
  suffix,
  block,
  LinkComponent,
  ...props
}, ref) => {
  return <ButtonBase {...props} ref={ref} LinkComponent={LinkComponent} iconOnly={false} block={block} content={content} noBorder={noBorder} suffix={suffix} variant={variant} onClick={onClick} href={href} type={type} disabled={disabled} sharpLeft={sharpLeft} sharpRight={sharpRight} noRing={noRing} noRounded={noRounded} prefix={prefix} className={className} />
})

Button.propTypes = {
  variant: PropTypes.oneOf([
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
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  LinkComponent: PropTypes.any,
}

Button.defaultProps = {
  variant: 'primary',
  onClick: undefined,
  type: "button",
  content: "button"
};


IconButton.propTypes = {
  /**
   * How the button looks like?
   */
  variant: PropTypes.oneOf(IconButtonStyles),
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
};

IconButton.defaultProps = {
  variant: 'basic',
  onClick: undefined,
  type: "button",
};