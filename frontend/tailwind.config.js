/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Màu thương hiệu VitaFamily (tông xanh y tế). Đổi tại đây để áp dụng toàn hệ thống.
        brand: {
          50: '#eef9f6',
          100: '#d6f0e9',
          500: '#10a37f',
          600: '#0e8c6d',
          700: '#0b6f56',
        },
      },
    },
  },
  plugins: [],
}
