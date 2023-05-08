/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow:{
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
    },
    fontFamily:{
      sans: ['Inter', 'sans-serif'],
    },
    screens:{
      'xs': {max:'489px'},
      // => @media (min-width: 490px) { ... }
      'sm': {min:'490px', max:'767px'},
      // => @media (min-width: 768px) { ... }
      'md': {min:'768px', max:'1039px'},
      // => @media (min-width: 1040px) { ... }
      'lg': {min:'1440px'},
      // => @media (min-width: 1440px) { ... }
    },
    spacing: {
      px: '1px',
      0: '0',
      0.25: '0.0625rem',
      0.5: '0.125rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
    },
    colors:{
      "secondary":{
        "50":"#F0FDFA",
        "100":"#CCFBF1",
        "200":"#99F6E4",
        "300":"#5EEAD4",
        "400":"#2DD4BF",
        "500":"#14B8A6",
        "600":"#0D9488",
        "700":"#0F766E",
        "800":"#115E59",
        "900":"#134E4A",
      },
      "primary":{
        "50":"#EFF6FF",
        "100":"#DBEAFE",
        "200":"#BFDBFE",
        "300":"#93C5FD",
        "400":"#60A5FA",
        "500":"#3B82F6",
        "600":"#2563EB",
        "700":"#1D4ED8",
        "800":"#1E40AF",
        "900":"#1E3A8A",
      },
      "critical":{
        "50":"#FEF2F2",
        "100":"#FEE2E2",
        "200":"#FECACA",
        "300":"#FCA5A5",
        "400":"#F87171",
        "500":"#EF4444",
        "600":"#DC2626",
        "700":"#B91C1C",
        "800":"#991B1B",
        "900":"#7F1D1D",
      },
      "fuchsia":{
        "50":"#FDF4FF",
        "100":"#FAE8FF",
        "200":"#F5D0FE",
        "300":"#F0ABFC",
        "400":"#E879F9",
        "500":"#D946EF",
        "600":"#C026D3",
        "700":"#A21CAF",
        "800":"#86198F",
        "900":"#701A75",
      },
      "success":{
        "50":"#F0FDF4",
        "100":"#DCFCE7",
        "200":"#BBF7D0",
        "300":"#86EFAC",
        "400":"#4ADE80",
        "500":"#22C55E",
        "600":"#16A34A",
        "700":"#15803D",
        "800":"#166534",
        "900":"#14532D",
      },
      "warn":{
        "50":"#FFFBEB",
        "100":"#FEF3C7",
        "200":"#FDE68A",
        "300":"#FCD34D",
        "400":"#FBBF24",
        "500":"#F59E0B",
        "600":"#D97706",
        "700":"#B45309",
        "800":"#92400E",
        "900":"#78350F",
      },
      "fill":{
        "50":"#FAFAFA",
        "100":"#F4F4F5",
        "200":"#E4E4E7",
        "300":"#D4D4D8",
        "400":"#A1A1AA",
        "500":"#71717A",
        "600":"#52525B",
        "700":"#3F3F46",
        "800":"#27272A",
        "900":"#18181B",
      },
      "grey":{
        "50":"#F9FAFB",
        "100":"#F3F4F6",
        "200":"#E4E4E7",
        "300":"#D1D5DB",
        "400":"#9CA3AF",
        "500":"#6B7280",
        "600":"#4B5563",
        "700":"#374151",
        "800":"#1F2937",
        "900":"#111827",
      }
    }
  },
  plugins: [],
}

