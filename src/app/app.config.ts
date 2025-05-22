import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

// Este archivo configura la aplicación Angular usando el nuevo enfoque standalone
// Aquí se definen todos los providers globales que necesita la app para funcionar
export const appConfig: ApplicationConfig = {
  providers: [
    // Mejora el rendimiento de la detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configura el router con las rutas que definí en app.routes.ts
    provideRouter(routes),
    // Habilita las peticiones HTTP que uso para conectar con mi API
    provideHttpClient(withInterceptorsFromDi()),
    // Activa las animaciones de Angular Material
    provideAnimations(),
    // Mejora el rendimiento de carga inicial (SSR)
    provideClientHydration()
  ]
};
