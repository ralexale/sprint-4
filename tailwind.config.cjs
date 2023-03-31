/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            colors: {
                mainColor: "#FFE031",
                darkColor: "#414141",
                darkfont: "#2F2F2F",
            },
        },
    },
    plugins: [],
};
