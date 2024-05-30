import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../service/user.service';
import { ImagenService } from '../../service/imagen.service';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: User[] = [];
  newUser: User = { nombre: '', telefono: '' };
  selectedFile: File | null = null;
  selectedUsuarioId: number | undefined;

  numeroId: number = 0;

  file: string = '';

  avatars: { [key: number]: string } = {};

  constructor(private userService: UserService, private imagenService: ImagenService) { }


  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.userService.getUsuarios().subscribe((data: User[]) => {
      this.users = data;
      this.users.forEach(usuario => {
        if (usuario.id !== undefined) {
          //this.cargarAvatar(usuario.id);
        }
      });
    });
  }

  agregarUsuario(): void {
    console.log("Pulso botón agregar usuario");
    this.userService.createUsuario(this.newUser).subscribe((usuario: User) => {
      this.users.push(usuario);
      this.selectedUsuarioId = usuario.id;
      console.log("Selected user ID" + this.selectedUsuarioId);
      this.newUser = { nombre: '', telefono: '' };
    });
  }

  onFileChange(event: any): void {

    this.selectedFile = event.target.files[0];

    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
    }

  }

  subirImagen(): void {
    console.log("Pulsado botón de subir");
    console.log(this.selectedUsuarioId);
    console.log(this.selectedFile);
    if (this.selectedUsuarioId && this.selectedFile) {
      this.imagenService.uploadAvatar(this.selectedUsuarioId, this.selectedFile).subscribe(() => {
        //this.obtenerUsuarios(); // Refrescar la lista de usuarios para mostrar la imagen recién cargada
        this.selectedFile = null;
        this.selectedUsuarioId = undefined;
      });
    }
  }

  cargarAvatar(usuarioId: number): void {
    this.imagenService.getAvatar(usuarioId).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.avatars[usuarioId] = event.target.result;
      };
      reader.readAsDataURL(blob);
    }, error => {
      console.log("ERROR al cargar la imagen");
    });
  }

  eliminarAvatar(usuarioId: number): void {

    this.imagenService.eliminarAvatar(usuarioId);
      
  }
  

}
