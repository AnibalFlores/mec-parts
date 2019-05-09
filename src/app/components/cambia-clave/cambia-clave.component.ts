import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-cambia-clave',
  templateUrl: './cambia-clave.component.html',
  styleUrls: ['./cambia-clave.component.css']
})
export class CambiaClaveComponent implements OnInit {

  usuario: Usuario;
  mensaje = '';
  nuevo = false;
  titulo = '';
  enviado = false;
  error = false;
  
  usuarioForm = new FormGroup({
    actual: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])),
    nueva: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5)

    ])),
    repetir: new FormControl('', Validators.compose([
      Validators.required,
    ]))
  }, (formGroup: FormGroup) => {
    return this.sonIguales(formGroup);
  });

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {

  }

  ngOnInit() {
    this.usuario = this.authSrv.user;
    this.titulo = 'Cambiar Clave de ' + this.usuario.usuario;
  }

  sonIguales(fG: FormGroup) {
    let valid = true;
   

    if (this.usuario) {
      if (fG.controls['actual'].value !== this.usuario.clave) {
        valid = false;
        this.mensaje = 'Clave actual no es correcta.';
        this.error = true;
      }
      if (this.usuario.clave === fG.controls['nueva'].value) {
        valid = false;
        this.mensaje = 'La clave nueva no puede ser igual a la actual.';
        this.error = true;
      }
    }

    if (!fG.controls['repetir'].value) {
      valid = false;
      this.mensaje = 'La verificación no puede ser vacia.';
      this.error = true;
    }

    if (!fG.controls['nueva'].value) {
      valid = false;
      this.mensaje = 'La clave nueva no puede ser vacia.';
      this.error = true;
    }

    if (!fG.controls['actual'].value) {
      valid = false;
      this.mensaje = 'La clave actual no puede ser vacia.';
      this.error = true;
    }

    if (fG.controls['actual'].getError('minlength')) {
      this.mensaje = 'Clave nueva debe tener al menos 5 caracteres.';
      valid = false;
      this.error = true;
    }

    if (fG.controls['nueva'].getError('minlength')) {
      this.mensaje = 'Clave nueva debe tener al menos 5 caracteres.'
      valid = false;
      this.error = true;
    };

    if (fG.controls['repetir'].value !== fG.controls['nueva'].value) {
      valid = false;
      this.mensaje = 'La clave nueva y la verificación no son iguales.';
      this.error = true;
    }

    if (valid) {
      this.mensaje = 'ok';
      this.error = false;
      return null;
    }

    return {
      sonIguales: true
    };
  }

  private cambiarClave() {
    this.authSrv.cambioClave(this.usuario.id, this.usuarioForm.controls['nueva'].value).subscribe(
      (a) => this.router.navigate(['/lista-status']),
      error => {
        alert('Error al cambiar la clave: ' + error);
        this.enviado = false;
      }
    );
  }

}
