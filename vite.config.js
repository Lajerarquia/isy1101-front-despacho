import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// TODO: reemplazar <ALB_URL_AQUI> con la URL real del ALB una vez creado en AWS
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ventas': {
        target: 'http://<ALB_URL_AQUI>',
        changeOrigin: true
      },
      '/despacho': {
        target: 'http://<ALB_URL_AQUI>',
        changeOrigin: true
      }
    }
  }
})
