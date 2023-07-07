export default {
    darkMode: 'class',
    theme: {
        extend: {
            keyframes: {
                slideOut: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(100%)' },
                },
                slideIn: {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'translateX(0)' },
                },
                swipeOut: {
                    from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
                    to: { transform: 'translateX(100%)' },
                },
                slideDownAndFade: {
                    from: { opacity: 0, transform: 'translateY(-2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideLeftAndFade: {
                    from: { opacity: 0, transform: 'translateX(2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                slideUpAndFade: {
                    from: { opacity: 0, transform: 'translateY(2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideRightAndFade: {
                    from: { opacity: 0, transform: 'translateX(-2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
            },
            animation: {
                slideOut: 'slideOut 150ms ease-out',
                slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                swipeOut: 'swipeOut 100ms ease-out',
                slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
            boxShadow: {
                'button': '0px 1px 4px rgba(0, 0, 0, 0.05)',
                'card': [
                    '0px 2px 1px rgba(0, 0, 0, 0.05)',
                    '0px 0px 1px rgba(0, 0, 0, 0.25)'
                ],
                'popover': [
                    '0px 0px 2px rgba(0, 0, 0, 0.2)',
                    '0px 2px 10px rgba(0, 0, 0, 0.1)'
                ],
                'deep': [
                    '0px 0px 0px 1px rgba(6, 44, 82, 0.1)',
                    '0px 2px 16px rgba(33, 43, 54, 0.08);'
                ],
                'modal': [
                    '0px 0px 1px rgba(0, 0, 0, 0.2)',
                    '0px 26px 80px rgba(0, 0, 0, 0.2)'
                ],
                'base': [
                    '0px 1px 3px rgba(63, 63, 68, 0.15)',
                    '0px 0px 0px 1px rgba(63, 63, 68, 0.05)'
                ],
            },
            maxWidth: {
                92: '23rem',
                95: '23.75rem',
                153: '38.25rem',
                296: '74rem' //1184px
            },
            minWidth: {
                32: "8rem",
                48: "12rem",
                72: '18rem'
            },
            width: {
                48: "12rem",
                92: '23rem',
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        // screens:{
        // 	'xs': {max:'489px'},
        // 	// => @media (min-width: 490px) { ... }
        // 	'sm': {min:'490px', max:'767px'},
        // 	// => @media (min-width: 768px) { ... }
        // 	'md': {min:'768px', max:'1039px'},
        // 	// => @media (min-width: 1040px) { ... }
        // 	'lg': {min:'1440px'},
        // 	// => @media (min-width: 1440px) { ... }

        // },
        screens: {
            'sm': '490',
            'md': '768px',
            'lg': '1040px',
            'xl': '1440px',
        },
        spacing: {
            px: '1px',
            docHeaderHeight: '4.375rem',
            docSidebarWidth: '18rem',
            0: '0',
            0.25: '0.0625rem',
            0.5: '0.125rem',
            1: '0.25rem',
            1.5: '0.375rem',
            2: '0.5rem',
            2.5: '0.625rem', //10px -- need to add
            3: '0.75rem',
            3.25: '0.813rem', //13px -- internal use
            3.75: '0.938rem', //15px - internal use
            4: '1rem',
            5: '1.25rem',
            5.5: '1.375rem', //22px -- internal use
            6: '1.5rem',
            8: '2rem',
            10: '2.5rem',
            12: '3rem',
            15: '3.75rem',//--token need to be add
            16: '4rem',
            20: '5rem',
            23.75: '5.938rem', //used in container
            24: '6rem',
            25: '6.25rem', //used in console.settings
            32: '8rem',
            37: '9.25rem', //used in empty state
            37.5: "9.375rem", //used in forgotpassword and login
            43: '10.75rem', //used in empty state
            45: "11.25rem", //used in console.settings
            95: "23.75rem", //used in popup
        },
        colors: {
            "surface": {
                "default": "#FFFFFF",
                "subdued": "#F3F4F6",
                "hovered": "#F4F4F5",
                "pressed": "#E4E4E7",
                "input": "#FFFFFF",
                "secondary": {
                    "default": "#14B8A6",
                    "subdued": "#ccfbf1",
                    "hovered": "#0D9488",
                    "pressed": "#0F766E",
                    "selected": "#99F6E4",
                },
                "primary": {
                    "default": "#3B82F6",
                    "subdued": "#dbeafe",
                    "hovered": "#2563eb",
                    "pressed": "#1D4ED8",
                    "selected": "#BFDBFE",
                },
                "tertiary": {
                    "default": "#3F3F46",
                    "hovered": "#27272A",
                    "pressed": "#18181B",
                },
                "critical": {
                    "default": "#EF4444",
                    "subdued": "#fee2e2",
                    "hovered": "#dc2626",
                    "pressed": "#B91C1C",
                    "selected": "#FECACA",
                },
                "warning": {
                    "default": "#F59E0B",
                    "subdued": "#fef3c7",
                    "hovered": "#d97706",
                    "pressed": "#B45309",
                    "selected": "#FDE68A",
                },
                "success": {
                    "default": "#22C55E",
                    "subdued": "#dcfce7",
                    "hovered": "#16a34a",
                    "pressed": "#15803D",
                    "selected": "#BBF7D0",
                }
            },
            "text": {
                "default": "#111827",
                "soft": "#71717A",
                "strong": "#4B5563",
                "disabled": "#9ca3af",
                "critical": "#DC2626",
                "warning": "#D97706",
                "success": "#16A34A",
                "primary": "#2563EB",
                "on": {
                    "primary": "#F9FAFB"
                },
                "secondary": "#0D9488",
            },
            "icon": {
                "default": "#111827",
                "soft": "#71717A",
                "strong": "#4B5563",
                "disabled": "#9ca3af",
                "critical": "#DC2626",
                "warning": "#D97706",
                "success": "#16A34A",
                "primary": "#2563EB",
                "on-primary": "#f9fafb",
                "secondary": "#0D9488",
            },
            "border": {
                "default": "#D4D4D8",
                "critical": "#DC2626",
                "warning": "#D97706",
                "success": "#16A34A",
                "primary": "#2563EB",
                "secondary": "#0d9488",
                "focus": "#60A5FA",
                "disabled": "#E4E4E7",
                "tertiary": "#52525B"
            },
            "secondary": {
                "50": "#F0FDFA",
                "100": "#CCFBF1",
                "200": "#99F6E4",
                "300": "#5EEAD4",
                "400": "#2DD4BF",
                "500": "#14B8A6",
                "600": "#0D9488",
                "700": "#0F766E",
                "800": "#115E59",
                "900": "#134E4A",
            },
            "primary": {
                "50": "#EFF6FF",
                "100": "#DBEAFE",
                "200": "#BFDBFE",
                "300": "#93C5FD",
                "400": "#60A5FA",
                "500": "#3B82F6",
                "600": "#2563EB",
                "700": "#1D4ED8",
                "800": "#1E40AF",
                "900": "#1E3A8A",
            },
            "critical": {
                "50": "#FEF2F2",
                "100": "#FEE2E2",
                "200": "#FECACA",
                "300": "#FCA5A5",
                "400": "#F87171",
                "500": "#EF4444",
                "600": "#DC2626",
                "700": "#B91C1C",
                "800": "#991B1B",
                "900": "#7F1D1D",
            },
            "fuchsia": {
                "50": "#FDF4FF",
                "100": "#FAE8FF",
                "200": "#F5D0FE",
                "300": "#F0ABFC",
                "400": "#E879F9",
                "500": "#D946EF",
                "600": "#C026D3",
                "700": "#A21CAF",
                "800": "#86198F",
                "900": "#701A75",
            },
            "success": {
                "50": "#F0FDF4",
                "100": "#DCFCE7",
                "200": "#BBF7D0",
                "300": "#86EFAC",
                "400": "#4ADE80",
                "500": "#22C55E",
                "600": "#16A34A",
                "700": "#15803D",
                "800": "#166534",
                "900": "#14532D",
            },
            "warn": {
                "50": "#FFFBEB",
                "100": "#FEF3C7",
                "200": "#FDE68A",
                "300": "#FCD34D",
                "400": "#FBBF24",
                "500": "#F59E0B",
                "600": "#D97706",
                "700": "#B45309",
                "800": "#92400E",
                "900": "#78350F",
            },
            "zinc": {
                "50": "#FAFAFA",
                "100": "#F4F4F5",
                "200": "#E4E4E7",
                "300": "#D4D4D8",
                "400": "#A1A1AA",
                "500": "#71717A",
                "600": "#52525B",
                "700": "#3F3F46",
                "800": "#27272A",
                "900": "#18181B",
            },
            "grey": {
                "50": "#F9FAFB",
                "100": "#F3F4F6",
                "200": "#E4E4E7",
                "300": "#D1D5DB",
                "400": "#9CA3AF",
                "500": "#6B7280",
                "600": "#4B5563",
                "700": "#374151",
                "800": "#1F2937",
                "900": "#111827",
            }
        }
    },
    plugins: [],
}
