import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'lloyds-green': '#006341',
                'lloyds-green-dark': '#004d32',
                'lloyds-green-light': '#a0e6c8',
            },
        },
    },
    plugins: [],
} satisfies Config