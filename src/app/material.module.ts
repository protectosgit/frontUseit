import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

// Este módulo centraliza todos los componentes de Angular Material que uso en la aplicación
// Lo hice así para no tener que importar cada componente por separado en cada archivo
// Es una buena práctica para mantener el código organizado
@NgModule({
  exports: [
    MatButtonModule, // Botones
    MatCardModule, // Tarjetas (como la del login y detalles)
    MatFormFieldModule, // Campos de formulario
    MatInputModule, // Inputs de texto
    MatIconModule, // Iconos (como los de usuario, contraseña, etc)
    MatTableModule, // La tabla que uso para mostrar los usuarios
    MatProgressSpinnerModule, // Spinner de carga
    MatSnackBarModule, // Mensajes emergentes (para errores)
    MatToolbarModule, // Barra superior
    MatDialogModule // Diálogos de confirmación para preguntar antes de cerrar sesión
  ]
})
export class MaterialModule {} 