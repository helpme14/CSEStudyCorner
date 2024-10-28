/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './landingpage/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px',
  			xxl: {
  				raw: '(min-height: 1400px)'
  			}
  		}
  	},
  	extend: {
		animation: {
			fadeInOut: 'fadeInOut 2s ease-in-out infinite',
		  },
  		fontFamily: {
  			sans: ['Open Sans', 'sans-serif']
  		},
  		keyframes: {
			fadeInOutArrow: {
				'0%, 100%': { opacity: '0' },
				'50%': { opacity: '1' },
			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primary: 'var(--primary)',
  			secondary: 'var(--secondary)',
  			accent: 'var(--accent)',
  			muted: 'var(--muted)',
  			card: 'var(--card)',
  			popover: 'var(--popover)',
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}