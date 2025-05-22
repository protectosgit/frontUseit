import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

/**
 * Componente Header - Barra superior que aparece en todas las páginas autenticadas
 * 
 * Este componente muestra el título de la página actual, el nombre del usuario
 * logueado y un botón para cerrar sesión. Cuando se hace clic en el botón,
 * muestra un diálogo de confirmación antes de continuar con el logout.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Título que se muestra en la barra superior - se recibe como entrada
  @Input() titulo: string = 'Aplicación Angular';
  
  // Evento que se emite cuando el usuario confirma el cierre de sesión
  @Output() logoutEvent = new EventEmitter<void>();
  
  constructor(
    // Servicio de autenticación para obtener el nombre del usuario
    private authService: AuthService,
    // Servicio de diálogos para mostrar confirmaciones
    private dialog: MatDialog
  ) {}
  
  /**
   * Obtiene el nombre del usuario actual desde localStorage
   * @returns Nombre del usuario o "Usuario" si no existe
   */
  get nombreUsuario(): string {
    return this.authService.getCurrentUser() || 'Usuario';
  }
  
  /**
   * Maneja el evento de cerrar sesión
   * Muestra un diálogo de confirmación antes de cerrar la sesión
   */
  onLogout(): void {
    // Abro un diálogo de confirmación antes de cerrar sesión
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Cerrar Sesión', // Título del diálogo
        message: '¿Estás seguro que deseas cerrar la sesión?' // Mensaje de confirmación
      },
      width: '350px' // Ancho personalizado del diálogo
    });
    
    // Me suscribo al resultado del diálogo
    dialogRef.afterClosed().subscribe(result => {
      // Si el usuario confirmó (hizo clic en "Confirmar"), emito el evento para cerrar sesión
      // Si canceló o cerró el diálogo, no hago nada
      if (result === true) {
        this.logoutEvent.emit();
      }
    });
  }
}
