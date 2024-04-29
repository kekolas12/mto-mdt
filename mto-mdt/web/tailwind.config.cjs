/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#111315',
                secondary: '#0d0e0f',
                box: '#141619'
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            }
        }
    },
    plugins: []
};
