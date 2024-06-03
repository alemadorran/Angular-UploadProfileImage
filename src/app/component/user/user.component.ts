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

  imageUrl: string | ArrayBuffer | null = null;

  constructor(private userService: UserService, private imagenService: ImagenService) { }


  ngOnInit(): void {

    this.obtenerUsuarios();

  }

  obtenerUsuarios(): void {

    this.userService.getUsuarios().subscribe((data: User[]) => {
      this.users = data;
      this.users.forEach(usuario => {
        if (usuario.id !== undefined) {
          console.log("Entro a cargar los usuarios");
          
          this.obtenerImagenUsuario();

        }
      });
    });

    
  }

  obtenerImagenUsuario(){

    console.log("users" + this.users.length);
    if(this.users.length > 0){

      console.log("Entro a llamar al servicio");
      this.imagenService.getAvatar(this.users[0].id!).subscribe(blob => {
        this.createImageFromBlob(blob);
      });

    }
  }

  createImageFromBlob(image: Blob): void {
    console.log("Entro a crear el blob");
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageUrl = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
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
      this.imageUrl = _file;
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

  

  eliminarAvatar(usuarioId: number): void {

    this.imagenService.eliminarAvatar(usuarioId);
      
  }
  

}
