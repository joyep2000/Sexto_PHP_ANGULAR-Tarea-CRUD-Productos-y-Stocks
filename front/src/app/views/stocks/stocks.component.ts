import { Component } from '@angular/core';
import { IStock } from '../../Interfaces/istock';
import { stockService } from '../../Services/stock.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent {
  title = 'stocks';
  stocks: IStock[];

  constructor(private stocksServicio: stockService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.stocksServicio.todos().subscribe((listastocks) => {
      this.stocks = listastocks;
      console.log(listastocks);
    });
  }
  alerta() {
    Swal.fire('Stocks', 'Mensaje en stocks', 'success');
  }

  eliminar(stockId: number) {
    Swal.fire({
      title: 'Stocks',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stocksServicio.eliminar(stockId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Stocks',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Stocks',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
