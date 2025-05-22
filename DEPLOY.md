# Instrucciones para desplegar en Vercel

Esta guía describe los pasos necesarios para desplegar la aplicación Angular en Vercel.

## Preparativos realizados en el código

1. **Variables de entorno**:
   - Se crearon archivos de entorno para desarrollo y producción (`environment.ts` y `environment.prod.ts`) 
   - Se configuró la URL de la API según el entorno

2. **Configuración de Vercel**:
   - Se agregó el archivo `vercel.json` para configurar el enrutamiento de la SPA
   - Se configuró el archivo `angular.json` para usar los archivos de entorno correctos

3. **Actualización de servicios**:
   - Los servicios de autenticación y usuario fueron actualizados para usar las variables de entorno
   - Esto permite cambiar fácilmente entre la API local y la de producción

## Pasos para el despliegue

1. **Preparación del repositorio**:
   ```bash
   # Asegúrate de tener todos los cambios guardados en git
   git add .
   git commit -m "Preparado para despliegue en Vercel"
   git push
   ```

2. **Despliegue con Vercel CLI** (opcional):
   ```bash
   # Instalar Vercel CLI si no está instalado
   npm install -g vercel

   # Login en Vercel
   vercel login

   # Desplegar
   vercel
   ```

3. **Despliegue mediante la interfaz web de Vercel**:
   - Ir a [vercel.com](https://vercel.com) y registrarse/iniciar sesión
   - Click en "New Project"
   - Importar el repositorio de GitHub
   - Configuración básica:
     - Framework Preset: Angular
     - Build Command: `npm run vercel-build`
     - Output Directory: `dist/prueba-tecnica-angular`
   - Click en "Deploy"

## Datos de prueba en producción

Para la versión de producción, se creará un repositorio adicional en GitHub con un archivo `db.json` que servirá como base de datos para [My JSON Server](https://my-json-server.typicode.com/).

Este archivo debe contener los mismos datos que el archivo `db.json` local, con usuarios y credenciales para poder hacer login en la aplicación desplegada.

## Verificación post-despliegue

Después de desplegar, verifica:

1. Que la aplicación carga correctamente
2. Que puedes iniciar sesión con las credenciales de prueba
3. Que puedes ver la lista de usuarios
4. Que el diálogo de confirmación de cierre de sesión funciona correctamente
5. Que la navegación y las rutas funcionan sin errores

## Solución de problemas

Si encuentras problemas durante el despliegue:

1. Verifica los logs de Vercel para identificar errores
2. Asegúrate que la URL de la API en `environment.prod.ts` es correcta
3. Comprueba que el repositorio para My JSON Server está correctamente configurado
4. Asegúrate que el archivo `vercel.json` está en la raíz del proyecto 