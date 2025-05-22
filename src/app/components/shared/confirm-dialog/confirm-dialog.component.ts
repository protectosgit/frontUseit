import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';

// Interfaz para los datos que recibe el diálogo
export interface ConfirmDialogData {
  title: string;    // Título que se mostrará en el diálogo
  message: string;  // Mensaje de confirmación que verá el usuario
}

/**
 * Componente para mostrar diálogos de confirmación en la aplicación
 * 
 * Este componente sirve para pedir confirmación al usuario antes de realizar
 * acciones importantes como cerrar sesión, eliminar registros, etc.
 * 
 * Se usa directamente con MatDialog.open() y devuelve true/false según
 * si el usuario confirmó o canceló.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <!-- Diálogo sencillo con título, mensaje y botones de confirmar/cancelar -->
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <!-- Botón para cancelar - cierra el diálogo sin valor de retorno -->
      <button mat-button mat-dialog-close>Cancelar</button>
      <!-- Botón para confirmar - cierra el diálogo con valor true -->
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Confirmar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    // Referencia al diálogo que nos permite controlarlo
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    // Datos recibidos del componente que abrió el diálogo
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
} 