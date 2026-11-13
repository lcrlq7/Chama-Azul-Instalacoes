/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        marinho: 'var(--azul-escuro)',
        azul: 'var(--azul-medio)',
        vivo: 'var(--azul-vivo)',
        laranja: 'var(--laranja)',
        'laranja-escuro': 'var(--laranja-escuro)',
        creme: 'var(--creme)',
        nevoa: 'var(--cinza-claro)',
        borda: 'var(--cinza-medio)',
        texto: 'var(--texto)',
        suave: 'var(--texto-suave)',
        whatsapp: 'var(--whatsapp)',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
      maxWidth: { site: '72rem' },
    },
  },
  plugins: [],
};
