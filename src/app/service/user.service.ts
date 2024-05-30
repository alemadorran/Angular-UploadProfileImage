
// src/app/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, usuario);
  }
}

export interface User {
  id?: number;
  nombre: string;
  telefono: string;
}

  