# Prueba Técnica Angular

Esta es una aplicación de demostración desarrollada con Angular 18 que simula un sistema de gestión de usuarios con autenticación.

## Características

- Página de inicio de sesión con validación de credenciales
- Lista de usuarios con tabla de datos
- Página de detalles de usuario
- Autenticación simulada con json-server
- Diálogo de confirmación al cerrar sesión
- Diseño responsive con Angular Material y Bootstrap
- Indicadores de carga para mejorar la experiencia de usuario

## Requisitos previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- Angular CLI (versión 18 o superior)

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/protectosgit/frontUseit.git
   cd prueba-tecnica-angular
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para ejecutar la aplicación en modo desarrollo con el servidor json-server:

```
npm run dev
```

Este comando iniciará tanto el servidor de desarrollo de Angular (en el puerto 4200) como el servidor json-server (en el puerto 3000) simultáneamente.

También puedes ejecutar cada uno por separado: asi

http://localhost:4200/login  ||   http://localhost:3000



- Servidor de desarrollo Angular:
  ```
  npm start
  ```

- Servidor json-server:
  ```
  npm run server
  ```

## Credenciales de prueba

Para iniciar sesión puedes utilizar cualquiera de estas credenciales:

- Usuario: admin, Contraseña: admin123
- Usuario: usuario, Contraseña: user123

## Estructura del proyecto

- `/src/app/components`: Componentes de la aplicación
  - `/login`: Componente de inicio de sesión
  - `/usuarios-lista`: Componente para mostrar la lista de usuarios
  - `/detalles-usuario`: Componente para mostrar los detalles de un usuario
  - `/shared`: Componentes compartidos (header, confirm-dialog, etc.)
- `/src/app/services`: Servicios para manejar la lógica de negocio
- `/src/app/guards`: Guards para proteger rutas
- `/src/app/models`: Interfaces y modelos de datos

## Funcionalidades implementadas

### Autenticación
- Login con validación de formulario
- Protección de rutas con guards
- Cierre de sesión con confirmación mediante diálogo

### Gestión de usuarios
- Listado de usuarios con búsqueda en tiempo real
- Detalles de usuario en vista dedicada
- Diseño responsivo con Material Design

## Tecnologías utilizadas

- Angular 18
- Angular Material
- Bootstrap
- RxJS
- json-server (para simular API REST)

## Autor

[Feliciano Mosquera]
