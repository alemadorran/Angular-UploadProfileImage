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
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/${usuarioId}`, formData);
  }

  getAvatar(usuarioId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`, { responseType: 'blob' });
  }
  
}
