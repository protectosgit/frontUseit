import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { AuthResponse, Credenciales } from '../models/usuario.interface';
import { environment } from '../../environments/environment';

// Este servicio lo uso para controlar todo lo relacionado con la autenticación
// Me permite hacer login, logout, y verificar si el usuario está logueado
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Uso la URL desde el archivo environment para poder cambiarla según el entorno
  private apiUrl = environment.apiUrl;
  // Este subject me permite rastrear el estado de autenticación y notificar a los componentes
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  // Recibe las credenciales y verifica contra el backend
  login(credenciales: Credenciales): Observable<AuthResponse> {
    return this.http.get<Credenciales[]>(`${this.apiUrl}/credenciales`)
      .pipe(
        map(response => {
          // Verifico localmente si existe un usuario con esas credenciales
          const usuarioEncontrado = response.find(
            user => user.usuario === credenciales.usuario && user.password === credenciales.password
          );
          
          // Si encuentro un usuario con esas credenciales
          if (usuarioEncontrado) {
            // Guardo un token simple (en un proyecto real usaría JWT)
            localStorage.setItem('token', 'jwt-token-simulado');
            localStorage.setItem('usuario', credenciales.usuario);
            this.isAuthenticatedSubject.next(true);
            return { success: true, usuario: credenciales.usuario };
          } else {
            // Si no encuentro usuario, devuelvo error
            return { success: false, message: 'Credenciales inválidas' };
          }
        }),
        catchError(error => {
          // Por si hay algún problema con el servidor
          console.error('Error en el login:', error);
          return of({ success: false, message: 'Error en el servidor' });
        })
      );
  }

  // Método para cerrar sesión
  // Borra el token y actualiza el estado de autenticación
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.isAuthenticatedSubject.next(false);
  }

  // Para mostrar el nombre del usuario actual en el header
  getCurrentUser(): string | null {
    return localStorage.getItem('usuario');
  }

  // Método privado para verificar si hay token guardado
  // Lo uso para saber si el usuario ya estaba autenticado al cargar la app
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
