import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Credenciales } from '../../models/usuario.interface';
import { MaterialModule } from '../../material.module';
import { MatIconModule } from '@angular/material/icon';

// Este es mi componente de login, la primera pantalla que ve el usuario
// Aquí implemento el formulario de inicio de sesión con validaciones
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  // Objeto para almacenar los datos del formulario
  credenciales: Credenciales = {
    usuario: '',
    password: ''
  };
  errorMessage: string = ''; // Mensaje de error si las credenciales son incorrectas
  isLoading: boolean = false; // Para mostrar el spinner mientras carga
  hidePassword: boolean = true; // Para mostrar/ocultar la contraseña

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Esto es para que si ya está logueado lo mande directo a la lista
    // y no tenga que volver a iniciar sesión
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/usuarios']);
      }
    });
  }

  // Esta función cambia la visibilidad de la contraseña cuando pulsan el ojo
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
    console.log('Toggle password visibility:', this.hidePassword);
  }

  // Esta función se ejecuta cuando el usuario pulsa en "Iniciar Sesión"
  onLogin(): void {
    // Primero verifico que hayan escrito algo en los campos
    if (!this.credenciales.usuario || !this.credenciales.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    // Activo el spinner y limpio cualquier error anterior
    this.isLoading = true;
    this.errorMessage = '';

    // Llamo al servicio de autenticación para verificar las credenciales
    this.authService.login(this.credenciales).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          // Si el login es exitoso, navego a la lista de usuarios
          this.router.navigate(['/usuarios']);
        } else {
          // Si hay error en las credenciales, muestro mensaje
          this.errorMessage = response.message || 'Error de autenticación';
        }
      },
      error: (error) => {
        // Si hay error con el servidor, también lo manejo
        this.isLoading = false;
        this.errorMessage = 'Error en el servidor. Intente nuevamente más tarde.';
        console.error('Error en login:', error);
      }
    });
  }
}
