import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FacturaService } from '../../../Services/factura.service';
import { CommonModule } from '@angular/common';
import { ICliente } from '../../../Interfaces/icliente';
import { ClienteService } from '../../../Services/cliente.service';
@Component({
  selector: 'app-nuevo-factura',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-factura.component.html',
  styleUrl: './nuevo-factura.component.css',
})
export class NuevoFacturaComponent {
  title = 'Nueva Factura';
  id!: number;

  ListaCliente: ICliente[];
  factura: FormGroup = new FormGroup({
    ID_cliente: new FormControl('', Validators.required),
    Total: new FormControl('', Validators.required),
    Estado: new FormControl('', Validators.required),
  });
  constructor(
    private facturaServicio: FacturaService,
    private rutas: Router,
    private parametros: ActivatedRoute,
    private clienteServicio: ClienteService
  ) { }

  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this.cargarCliente();
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nueva Factura';
    } else {
      this.title = 'Actualizar Factura';
      this.facturaServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.factura.patchValue({
          ID_cliente: res.ID_cliente,
          Total: res.Total,
          Estado: res.Estado,
        });
      });
    }
  }
  cargarCliente() {
    this.clienteServicio.todos().subscribe((res) => {
      this.ListaCliente = res;
    })
  }
  get f() {
    return this.factura.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Facturas',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.facturaServicio
            .insertar(this.factura.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'Facturas',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/facturas']);
              this.id = 0;
            });
        } else {
          this.facturaServicio
            .actualizar(this.factura.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'facturas',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/facturas']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Facturas',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
