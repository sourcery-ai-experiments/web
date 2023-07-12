import * as React from "react"
import * as OptionMenuPrimitive from "./_dropdown-primitive"
import { TextInputBase } from "./input"
import { cn } from "../utils"

const OptionMenu = OptionMenuPrimitive.Root

const OptionMenuTriggerBase = OptionMenuPrimitive.Trigger


const OptionMenuRadioGroup = OptionMenuPrimitive.RadioGroup

const OptionMenuTrigger = React.forwardRef(({ ...props }, ref) => (
    <OptionMenuTriggerBase ref={ref} {...props} asChild is-menu-button={'true'} />

))

const OptionMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
    <OptionMenuPrimitive.Portal>
        <OptionMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            align="end"
            loop
            className={cn(
                "OptionContent z-50 border border-border-default shadow-popover bg-surface-default rounded min-w-48 overflow-hidden py-2",
                className
            )}
            {...props}
        />
    </OptionMenuPrimitive.Portal>
))
OptionMenuContent.displayName = OptionMenuPrimitive.Content.displayName

const OptionMenuItem = React.forwardRef(({ className, ...props }, ref) => (
    <OptionMenuPrimitive.Item
        ref={ref}
        className={cn(
            "group relative flex flex-row gap-2.5 items-center bodyMd gap cursor-default select-none py-2 px-3 text-text-default outline-none transition-colors focus:bg-surface-hovered hover:bg-surface-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled",
            className
        )}
        {...props}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
    />
))
OptionMenuItem.displayName = OptionMenuPrimitive.Item.displayName


const OptionMenuTextInputItem = React.forwardRef(({ onChange, ...props }, ref) => {
    let searchRef = React.useRef(null)
    const setSearchFocus = (e) => {
        e?.preventDefault()
        searchRef.current.focus()
    }

    return (
        <OptionMenuPrimitive.Item
            ref={ref}
            className={cn(
                "group relative flex flex-row items-center bodyMd gap cursor-default select-none py-2 px-3 text-text-default outline-none transition-colors focus:bg-surface-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled",
            )}
            onSelect={setSearchFocus}
            onClick={(e) => setSearchFocus()}
            onPointerUp={setSearchFocus}
            onPointerDown={(e) => setSearchFocus()}
            onMouseMove={(e) => e.preventDefault()}
            onMouseEnter={(e) => e.preventDefault()}
            onMouseLeave={(e) => e.preventDefault()}
            onPointerMove={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
            onFocus={(e) => {
                searchRef.current.focus()
            }}
            {...props}
            asChild
        >
            <TextInputBase component={'input'} ref={searchRef} autoComplete={"off"}

                onChange={(e) => { onChange && onChange(e.target.value) }} onKeyDown={(e) => {
                    e.stopPropagation()
                }} />
        </OptionMenuPrimitive.Item>
    )
})
OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName

const OptionMenuCheckboxItem = React.forwardRef(({ className, showIndicator = true, children, checked, onValueChange, ...props }, ref) => (
    <OptionMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "group relative flex flex-row gap-2.5 items-center bodyMd gap cursor-default select-none py-2 px-3 text-text-default outline-none transition-colors focus:bg-surface-hovered hover:bg-surface-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled",
            {
                "data-[state=checked]:bg-surface-primary-subdued data-[state=checked]:text-text-primary": !showIndicator
            },
            className
        )}
        checked={checked}
        {...props}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onCheckedChange={onValueChange}
    >
        {showIndicator && <span className="w-4 h-4 rounded border transition-all flex items-center justify-center border-border-default group-data-[state=checked]:border-border-primary group-data-[state=checked]:bg-surface-primary-default group-data-[disabled]:border-border-disabled group-data-[disabled]:bg-surface-default ">
            <OptionMenuPrimitive.ItemIndicator>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {
                        <path d="M12.25 3.50017L5.25 10.4999L1.75 7.00017" strokeLinecap="round" strokeLinejoin="round"
                            className={
                                cn("stroke-text-on-primary group-data-[disabled]:stroke-text-disabled")
                            }
                        />
                    }

                </svg>
            </OptionMenuPrimitive.ItemIndicator>
        </span>}
        {children}
    </OptionMenuPrimitive.CheckboxItem>
))
OptionMenuCheckboxItem.displayName =
    OptionMenuPrimitive.CheckboxItem.displayName

const OptionMenuRadioItem = React.forwardRef(({ className, showIndicator = true, children, ...props }, ref) => (
    <OptionMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            "group relative flex flex-row gap-2.5 items-center bodyMd gap cursor-default select-none py-2 px-3 text-text-default outline-none transition-colors focus:bg-surface-hovered hover:bg-surface-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled",
            {
                "data-[state=checked]:bg-surface-primary-subdued data-[state=checked]:text-text-primary": !showIndicator
            },
            className
        )}
        {...props}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
    >
        {showIndicator && <span className={cn(
            "w-4 h-4 rounded-full border transition-all flex items-center justify-center border-border-default group-data-[state=checked]:border-border-primary group-data-[disabled]:border-border-disabled",
        )}>
            <OptionMenuPrimitive.ItemIndicator>
                <div className={cn(
                    "block w-2 h-2 rounded-full bg-surface-primary-default group-data-[disabled]:bg-icon-disabled",
                )}></div>
            </OptionMenuPrimitive.ItemIndicator>
        </span>}
        {children}
    </OptionMenuPrimitive.RadioItem>
))
OptionMenuRadioItem.displayName = OptionMenuPrimitive.RadioItem.displayName

const OptionMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
    <OptionMenuPrimitive.Label
        ref={ref}
        className={cn(
            "px-2 py-1.5 text-sm font-semibold",
            inset && "pl-8",
            className
        )}
        {...props}
    />
))
OptionMenuLabel.displayName = OptionMenuPrimitive.Label.displayName

const OptionMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <OptionMenuPrimitive.Separator
        ref={ref}
        className={cn("h-px bg-border-disabled", className)}
        {...props}
    />
))
OptionMenuSeparator.displayName = OptionMenuPrimitive.Separator.displayName

const OptionMenuShortcut = ({
    className,
    ...props
}) => {
    return (
        <span
            className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
            {...props}
        />
    )
}
OptionMenuShortcut.displayName = "OptionMenuShortcut"

const OptionList = ({ ...props }) => {
    const [open, setOpen] = React.useState(props.open)

    React.useEffect(() => {
        if (props.onOpenChange)
            props.onOpenChange(open)
    }, [open])
    return (
        <OptionMenu open={open} onOpenChange={setOpen}>
            {props.children}
        </OptionMenu>
    )
}

OptionList.RadioGroup = OptionMenuRadioGroup
OptionList.RadioGroupItem = OptionMenuRadioItem
OptionList.CheckboxItem = OptionMenuCheckboxItem
OptionList.Separator = OptionMenuSeparator
OptionList.Content = OptionMenuContent
OptionList.Trigger = OptionMenuTrigger
OptionList.TextInput = OptionMenuTextInputItem
OptionList.Item = OptionMenuItem


export default OptionList