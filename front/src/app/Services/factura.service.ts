import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFactura } from '../Interfaces/ifactura';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private urlBase: string =
    'http://localhost/Examen_Segunda_Parcial/Contabilidad/Controllers/Factura.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<IFactura[]> {
    return this.clientePhp.get<IFactura[]>(this.urlBase + 'todos');
  }
  insertar(factura: IFactura): Observable<any> {
    var fact = new FormData();
    fact.append('ID_cliente', factura.ID_cliente.toString());
    fact.append('Total', factura.Total.toString());
    fact.append('Estado', factura.Estado);
    return this.clientePhp.post(this.urlBase + 'insertar', fact);
  }
  eliminar(id: number): Observable<any> {
    var fact = new FormData();
    fact.append('ID_factura', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', fact);
  }
  uno(id: number): Observable<IFactura> {
    var fact = new FormData();
    fact.append('ID_factura', id.toString());
    return this.clientePhp.post<IFactura>(this.urlBase + 'uno', fact);
  }
  actualizar(factura: IFactura, id: number): Observable<any> {
    var fact = new FormData();
    fact.append('ID_factura', id.toString());
    fact.append('ID_cliente', factura.ID_cliente.toString());
    fact.append('Total', factura.Total.toString());
    fact.append('Estado', factura.Estado);
    return this.clientePhp.post(this.urlBase + 'actualizar', fact);
  }
}
