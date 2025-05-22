import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { DetallesUsuarioComponent } from './components/detalles-usuario/detalles-usuario.component';
import { authGuard } from './guards/auth.guard';

// Aquí configuro todas las rutas de mi aplicación
// Defino qué componente se muestra en cada URL y si necesita autenticación
export const routes: Routes = [
  // Ruta por defecto, redirecciona a login para iniciar sesión
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Pantalla de login, esta no tiene protección para que cualquiera pueda acceder
  { path: 'login', component: LoginComponent },
  
  // Lista de usuarios - protegida con el guard de autenticación
  // Solo usuarios logueados pueden ver esta página
  { 
    path: 'usuarios', 
    component: UsuariosListaComponent, 
    canActivate: [authGuard] 
  },
  
  // Detalles de un usuario específico - también protegida
  // El :id es un parámetro dinámico que pasamos en la URL
  { 
    path: 'usuario/:id', 
    component: DetallesUsuarioComponent, 
    canActivate: [authGuard] 
  },
  
  // Comodín para cualquier otra ruta que no exista
  // Redirecciona a login si la URL no coincide con ninguna ruta definida
  { path: '**', redirectTo: '/login' }
];
