import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Este es el componente principal de toda la aplicación
// Es lo primero que se carga y contiene el router-outlet que muestra los demás componentes
// No tiene mucha lógica porque solo sirve como contenedor para las distintas vistas
@Component({
  // El selector que se usa en el index.html para mostrar la aplicación
  selector: 'app-root',
  // Standalone: true porque estoy usando la nueva forma de Angular sin NgModules
  standalone: true,
  // Solo necesito importar el RouterOutlet para que funcionen las rutas
  imports: [RouterOutlet],
  // La plantilla solo contiene el router-outlet, ya que todo el contenido viene de los componentes hijos
  templateUrl: './app.component.html',
  // Estilos específicos para este componente (aunque no tiene muchos porque es solo un contenedor)
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prueba-tecnica-angular';
}
