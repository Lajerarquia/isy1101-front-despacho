import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ventas': {
        target: 'http://alb-innovatech-1660336161.us-east-1.elb.amazonaws.com',
        changeOrigin: true
      },
      '/despacho': {
        target: 'http://alb-innovatech-1660336161.us-east-1.elb.amazonaws.com',
        changeOrigin: true
      }
    }
  }
})
