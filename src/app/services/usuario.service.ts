import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../models/usuario.interface';
import { environment } from '../../environments/environment';

// Este servicio me ayuda a conseguir los datos de los usuarios desde mi API
// Lo uso tanto para la lista de usuarios como para ver los detalles de cada uno
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Uso la URL desde environment para cambiarla según el entorno (desarrollo o producción)
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Este método trae todos los usuarios para mostrarlos en la tabla
  // Si falla, devuelve un array vacío y lo manejo en el componente
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener usuarios:', error);
          return of([]);
        })
      );
  }

  // Este método trae un solo usuario por su ID
  // Lo uso en la pantalla de detalles para mostrar toda la info
  // Si no existe o hay error, devuelve null y muestro mensaje
  getUsuarioById(id: number): Observable<Usuario | null> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error al obtener usuario con ID ${id}:`, error);
          return of(null);
        })
      );
  }
}
