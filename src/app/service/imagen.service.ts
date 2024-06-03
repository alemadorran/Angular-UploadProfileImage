import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  
  private apiUrl = 'http://localhost:8080/api/imagenes';

  constructor(private http: HttpClient) { }

  uploadAvatar(usuarioId: number, file: File): Observable<any> {
    console.log("lo que le llega: " + file.type);
    const formData: FormData = new FormData();
    console.log(formData);
    formData.append('file', file);
    console.log(formData);
    return this.http.post<any>(`${this.apiUrl}/${usuarioId}`, formData);
  }

  getAvatar(usuarioId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`, { responseType: 'blob' });
  }

  eliminarAvatar(usuarioId: number): void {

    console.log("Entramos a eliminar la imagen")
    console.log("El num de usuario: " + usuarioId);

    this.http.delete(`${this.apiUrl}/${usuarioId}`);
      
  }
  
}
