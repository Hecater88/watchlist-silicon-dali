/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				background: {
					light: "#ffffff",
					dark: "#0f0d23",
				},
				surface: {
					light: "#f4f4f5",
					dark: "#151312",
				},
				text: {
					light: "#000000",
					dark: "#ffffff",
				},
				primary: "#4f46e5",
				accent: "#AB8BFF",
				border: {
					light: "#e5e7eb",
					dark: "#3f3f46",
				},
			},
		},
	},
	plugins: [],
};
