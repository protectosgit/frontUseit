import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

// Este guard lo uso para proteger las rutas de mi aplicación
// Si el usuario no está autenticado, lo redirijo al login
// Es como un portero que solo deja pasar a los que tienen credenciales
export const authGuard: CanActivateFn = (route, state) => {
  // Uso inject porque es un functional guard (nueva forma en Angular)
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    // take(1) para que se complete después de la primera emisión
    take(1),
    map(isAuthenticated => {
      // Si está autenticado, dejo pasar (return true)
      if (isAuthenticated) {
        return true;
      } else {
        // Si no está autenticado, lo mando al login
        router.navigate(['/login']);
        return false;
      }
    })
  );
}; 