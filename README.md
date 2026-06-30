# Frontend Despacho — Innovatech Chile

Aplicación web construida con React 18, Vite y Tailwind CSS que consume las APIs de ventas y despachos. Sirve los archivos estáticos desde Nginx y se despliega como contenedor en AWS ECS Fargate.

## Arquitectura

```
Internet → ALB (alb-innovatech) → / (default) → tg-frontend (puerto 80) → ECS svc-frontend
                                 → /ventas/*   → tg-ventas
                                 → /despacho/* → tg-despachos
```

El frontend recibe tráfico en el listener por defecto del ALB. Las llamadas a `/ventas` y `/despacho` el ALB las redirige a los backends correspondientes.

## Requisitos previos

- Node 20+
- Docker

## Correr localmente con Docker

```bash
docker build -t innovatech-frontend .
docker run -p 80:80 innovatech-frontend
```

La app queda disponible en `http://localhost`.

Para desarrollo local sin Docker, usa el servidor de Vite (el proxy del `vite.config.js` apunta al ALB):

```bash
npm install
npm run dev
```

## Despliegue en ECS

El pipeline se dispara automáticamente en cada push a `main`. Los pasos son:

1. Autenticación en AWS con las credenciales del Learner Lab (secrets del repo)
2. Login a Amazon ECR
3. Build de la imagen Docker desde la raíz del repo, tag con el SHA del commit, push a ECR (`innovatech-frontend`)
4. Descarga de la Task Definition actual (`td-frontend`) desde ECS
5. Actualización del campo de imagen con la nueva versión
6. Deploy al servicio `svc-frontend` en el cluster `innovatech-cluster`, esperando estabilización

> **Nota:** las credenciales de AWS del Learner Lab vencen con cada sesión. Actualizar los secrets `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` y `AWS_SESSION_TOKEN` en GitHub antes de cada clase.

## URL de acceso

`http://alb-innovatech-1660336161.us-east-1.elb.amazonaws.com`
