import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import jwtDecode from 'jwt-decode'; // ✅ Asegúrate de instalar esta librería si no está instalada

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`; // ✅ Ajusta si usas otra ruta base

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { userName, password }).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token guardado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verifica si hay token y si es válido
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp > Date.now() / 1000; // Verifica si el token no ha expirado
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }

  // Elimina el token del almacenamiento
  logout(): void {
    localStorage.removeItem('token');
  }

  // Método para registrar un nuevo usuario
  register(userName: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, { userName, password, email }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo centralizado de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud HTTP:', error);
    return throwError(() => error);
  }
}
