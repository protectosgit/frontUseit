import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.interface';
import { HeaderComponent } from '../shared/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, HeaderComponent, MatTooltipModule],
  templateUrl: './usuarios-lista.component.html',
  styleUrl: './usuarios-lista.component.scss'
})
export class UsuariosListaComponent implements OnInit {
  usuarios: Usuario[] = [];
  columnas: string[] = ['nombre', 'email', 'puesto', 'acciones'];
  isLoading: boolean = true;
  dataSource = new MatTableDataSource<Usuario>();
  searchTerm: string = '';
  
  // En este constructor inyecto los servicios que necesito para la pantalla de usuarios:
  // - usuarioService: para traer la lista de todos los usuarios
  // - authService: para poder cerrar sesión
  // - router: para navegar a la página de detalles
  // - snackBar: para mostrar alertas si falla la carga de datos
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Este método se encarga de obtener todos los usuarios desde el backend
  // Mientras se cargan los datos, muestro un spinner
  // Cuando llega la respuesta:
  // - Si todo sale bien, guardo los usuarios y los asigno al dataSource para la tabla
  // - Si hay un error, muestro un mensaje para que el usuario sepa que algo falló
  cargarUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.dataSource.data = usuarios;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.isLoading = false;
        this.snackBar.open('Error al cargar los usuarios', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  verDetalles(id: number): void {
    this.router.navigate(['/usuario', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
