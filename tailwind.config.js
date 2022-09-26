module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            light: {
                ...require("daisyui/src/colors/themes")[
                    "[data-theme=pastel]"
                ],
                "bg-base-100": "#f99952",
                // "base-100": "#060938",
                // "base-200": "#0d104a",
                // "base-300": "#1a1c63"
            },
        }, ],
    },
}