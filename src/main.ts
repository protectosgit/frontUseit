// Este es el punto de entrada principal de la aplicación Angular
// Aquí se inicia todo el proceso de arranque usando el nuevo método bootstrapApplication
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Esta línea inicia la aplicación usando el componente raíz (AppComponent)
// y la configuración definida en app.config.ts (donde están las rutas, providers, etc.)
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Si hay algún error durante el arranque, lo muestra en consola
