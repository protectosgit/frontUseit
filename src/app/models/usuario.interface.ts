// Aquí defino las interfaces que uso en toda la aplicación
// Una interfaz es como un contrato que me asegura que los objetos tienen la estructura que espero

// Esta interfaz representa el modelo de datos de un usuario
// Contiene todos los campos que se muestran en la tabla y en los detalles
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  puesto: string;
  departamento: string;
}

// Esta interfaz la uso para el formulario de login
// Usuario y contraseña que se envían al backend para autenticar
export interface Credenciales {
  usuario: string;
  password: string;
  id?: number; // ID opcional que viene del backend
}

// Esta interfaz define la respuesta que recibo del servicio de autenticación
// Me indica si el login fue exitoso y trae mensajes de error si falló
export interface AuthResponse {
  success: boolean;
  message?: string; // Mensaje de error opcional
  usuario?: string; // Nombre de usuario si el login fue exitoso
} 