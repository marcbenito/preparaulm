/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 15s ease infinite",
      },
      textColor: {
        // Clases personalizadas para textos
        main: "#FFFFFF", // Texto principal
        secondary: "#BFDBFE", // Texto secundario (blue-200)
        tertiary: "#93C5FD", // Texto terciario (blue-300)
        subtle: "#DBEAFE", // Texto sutil (blue-100)
        highlight: "#FEF08A", // Texto destacado (yellow-200)
        accent: "#FACC15", // Texto de acento (yellow-400)
        action: "#1E3A8A", // Texto sobre botones de acción (blue-900)
      },
    },
  },
  plugins: ["tailwindcss-animate", require("@tailwindcss/typography")],
}

module.exports.plugins.push(function ({ addUtilities }) {
  const newUtilities = {
    ".bg-cosmic-night": {
      background: "linear-gradient(to bottom right, #1E3A8A, #581C87, #312E81)",
    },
    ".bg-azure-breeze": {
      background: "linear-gradient(to right, #60A5FA, #22D3EE)",
    },
    ".bg-ocean-depths": {
      background: "linear-gradient(to bottom right, #3B82F6, #06B6D4)",
    },
    ".bg-magenta-sunset": {
      background: "linear-gradient(to bottom right, #8B5CF6, #EC4899)",
    },
    ".bg-emerald-forest": {
      background: "linear-gradient(to bottom right, #10B981, #10B981)",
    },
  }

  addUtilities(newUtilities, ["hover", "responsive"])
})
