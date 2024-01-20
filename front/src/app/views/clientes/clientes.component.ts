import { Component } from '@angular/core';
import { ICliente } from '../../Interfaces/icliente';
import { ClienteService } from '../../Services/cliente.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  title = 'Clientes';
  cliente: ICliente[];

  constructor(private clientesServicio: ClienteService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.clientesServicio.todos().subscribe((listaclientes) => {
      this.cliente = listaclientes;
      console.log(listaclientes);
    });
  }
  alerta() {
    Swal.fire('Clientes', 'Mensaje en clientes', 'success');
  }

  eliminar(ID_cliente: number) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesServicio.eliminar(ID_cliente).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Clientes',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
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
