import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/user/user.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private userService: UserService,
    private usuarioService: UsuarioService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.carregarPerfilUsuari();
  }

  carregarPerfilUsuari(){
    let email = this.userService.getUserName();
    this.usuarioService.consultarPorEmail(email).subscribe((usuario:Usuario) => {
      this.usuario = usuario;
    } , err => {
      console.log(err);
    });
  }

  logout(){
      this.userService.logout();
      this.router.navigate(['']);
  }

}
