import PropTypes from 'prop-types';
import { XFill } from '@jengaicons/react';
import { cn } from '../utils';

export const ChipTypes = Object.freeze({
    BASIC: "BASIC",
    REMOVABLE: "REMOVABLE",
    CLICKABLE: "CLICKABLE"
})


export const Chip = ({ label, disabled, type = ChipTypes.BASIC, onClose, prefix, onClick }) => {

    let Component = "div"
    if (type === ChipTypes.CLICKABLE) {
        Component = "button"
    }

    let Prefix = prefix

    return (
        <Component
            className={cn(
                "rounded border bodySm-medium py-px flex items-center transition-all outline-none flex-row gap-1.5 ring-offset-1",
                "focus-within:ring-2 focus-within:ring-border-focus",
                "w-fit",
                {
                    "text-text-default": !disabled,
                    "text-text-disabled": disabled,
                },
                {
                    "pointer-events-none": disabled,
                },
                {
                    "border-border-default": !disabled,
                    "border-border-disabled": disabled,
                },
                {
                    "bg-surface-default": !disabled,
                },
                {
                    "pr-1 pl-2": type === ChipTypes.REMOVABLE,
                    "px-2": type != ChipTypes.REMOVABLE
                },
                {
                    "hover:bg-surface-hovered active:bg-surface-pressed focus-visible:ring-2 focus:ring-border-focus": type === ChipTypes.CLICKABLE,
                }
            )}
            onClick={onClick}
        >
            {
                Prefix && type != ChipTypes.CLICKABLE && ((typeof Prefix == "string") ? <span className='bodySm text-text-soft'>{Prefix}</span> : <Prefix size={16} color="currentColor" />)
            }
            <span className='flex items-center'>
                {label}
            </span>
            {
                type == ChipTypes.REMOVABLE && <button
                    disabled={disabled}
                    onClick={onClose}
                    className={cn('outline-none flex items-center rounded-sm ring-offset-0 justify-center hover:bg-surface-hovered active:bg-surface-pressed',
                        {
                            "cursor-default": disabled
                        })}>
                    <XFill size={16} color="currentColor" />
                </button>
            }
        </Component>
    );
};




Chip.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClose: PropTypes.func,
    type: PropTypes.oneOf([ChipTypes.BASIC, ChipTypes.CLICKABLE, ChipTypes.REMOVABLE]),
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func
};

Chip.defaultProps = {
    label: "test",
    onClose: null,
    disabled: false,
};
