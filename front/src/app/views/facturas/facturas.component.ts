import { Component } from '@angular/core';
import { IFactura } from '../../Interfaces/ifactura';
import { FacturaService } from '../../Services/factura.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css',
})
export class FacturasComponent {
  title = 'facturas';
  facturas: IFactura[];

  constructor(private facturaServicio: FacturaService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.facturaServicio.todos().subscribe((listafacturas) => {
      this.facturas = listafacturas;
      console.log(listafacturas);
    });
  }
  alerta() {
    Swal.fire('Facturas', 'Mensaje en facturas', 'success');
  }

  eliminar(ID_factura: number) {
    Swal.fire({
      title: 'facturas',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaServicio.eliminar(ID_factura).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Facturas',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
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
