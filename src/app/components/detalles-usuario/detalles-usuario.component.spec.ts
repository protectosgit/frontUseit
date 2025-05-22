// Importamos las herramientas de testing de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importamos el componente que vamos a probar
import { DetallesUsuarioComponent } from './detalles-usuario.component';

// Este bloque describe el conjunto de pruebas para el componente
describe('DetallesUsuarioComponent', () => {
  // Variables para acceder al componente y su entorno de pruebas
  let component: DetallesUsuarioComponent;
  let fixture: ComponentFixture<DetallesUsuarioComponent>;

  // Este método se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configuramos el módulo de pruebas con nuestro componente
    await TestBed.configureTestingModule({
      imports: [DetallesUsuarioComponent]
    })
    .compileComponents();

    // Creamos una instancia del componente para la prueba
    fixture = TestBed.createComponent(DetallesUsuarioComponent);
    // Accedemos a la instancia del componente
    component = fixture.componentInstance;
    // Disparamos la detección de cambios inicial
    fixture.detectChanges();
  });

  // Esta es la prueba más básica: verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
