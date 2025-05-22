import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.interface';
import { HeaderComponent } from '../shared/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// Aquí configuro el componente con el decorador @Component
// Este decorador es la parte más importante porque le dice a Angular cómo debe crear y usar este componente
@Component({
  // Este es el nombre de la etiqueta HTML que usaré para insertar este componente en las plantillas
  selector: 'app-detalles-usuario',
  // Con standalone: true hago que este componente sea independiente y no necesite un módulo
  // Es la forma moderna de crear componentes en Angular
  standalone: true,
  // Aquí importo los módulos y componentes que necesito usar en mi plantilla HTML
  // - CommonModule: para usar directivas como ngIf y ngFor
  // - MaterialModule: para usar componentes de Angular Material como botones y tarjetas
  // - HeaderComponent: el componente de encabezado que reutilizo en varias pantallas
  imports: [CommonModule, MaterialModule, HeaderComponent],
  // Esta es la ruta al archivo HTML que contiene la estructura visual del componente
  templateUrl: './detalles-usuario.component.html',
  // Esta es la ruta al archivo de estilos CSS/SCSS para este componente
  styleUrl: './detalles-usuario.component.scss'
})
export class DetallesUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;
  isLoading: boolean = true;
  
  // Aquí importo todos los servicios y herramientas que necesito para que funcione el componente:
  // - route: para obtener el ID del usuario desde la URL
  // - usuarioService: para hacer la consulta al backend y traer los datos
  // - authService: para manejar el cierre de sesión
  // - router: para navegar entre páginas
  // - snackBar: para mostrar mensajes de error o confirmación
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  // Esta función se encarga de cargar los datos del usuario desde el backend
  // Primero obtengo el ID desde la URL, verifico que sea un número válido
  // Luego hago la petición al servicio, y cuando recibo respuesta:
  // - Si todo sale bien, guardo el usuario en la propiedad del componente
  // - Si hay errores, muestro un mensaje y redirijo a la lista de usuarios
  // También manejo el estado de carga para mostrar un spinner mientras se cargan los datos
  cargarUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.snackBar.open('ID de usuario inválido', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/usuarios']);
      return;
    }
    
    this.isLoading = true;
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.isLoading = false;
        if (!usuario) {
          this.snackBar.open('Usuario no encontrado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/usuarios']);
        }
      },
      error: (error) => {
        console.error(`Error al cargar usuario con ID ${id}:`, error);
        this.isLoading = false;
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', {
          duration: 3000
        });
        this.router.navigate(['/usuarios']);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/usuarios']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
