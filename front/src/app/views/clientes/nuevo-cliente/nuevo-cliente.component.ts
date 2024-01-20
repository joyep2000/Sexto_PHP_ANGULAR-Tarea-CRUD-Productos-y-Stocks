import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../../Services/cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent {
  title = '';
  id!: number;

  cliente: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Direccion: new FormControl('', Validators.required),
    Telefono: new FormControl('', [
      Validators.required,
      Validators.maxLength(17),
      Validators.minLength(7),
    ]),
    Correo: new FormControl('', [Validators.required, Validators.email]),

  });
  constructor(
    private clienteServicio: ClienteService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Cliente';
    } else {
      this.title = 'Actualizar Cliente';
      this.clienteServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.cliente.patchValue({
          Nombre: res.Nombre,
          Direccion: res.Direccion,
          Telefono: res.Telefono,
          Correo: res.Correo,
        });
      });
    }
  }
  get f() {
    return this.cliente.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.clienteServicio
            .insertar(this.cliente.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'Clientes',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        } else {
          this.clienteServicio
            .actualizar(this.cliente.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Clientes',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Clientes',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
