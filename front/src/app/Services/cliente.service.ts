import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../Interfaces/icliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlBase: string =
    'http://localhost/Examen_Segunda_Parcial/Contabilidad/Controllers/Cliente.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<ICliente[]> {
    return this.clientePhp.get<ICliente[]>(this.urlBase + 'todos');
  }
  insertar(cliente: ICliente): Observable<any> {
    var clie = new FormData();
    clie.append('Nombre', cliente.Nombre);
    clie.append('Direccion', cliente.Direccion);
    clie.append('Telefono', cliente.Telefono);
    clie.append('Correo', cliente.Correo);
    return this.clientePhp.post(this.urlBase + 'insertar', clie);
  }
  eliminar(id: number): Observable<any> {
    var clie = new FormData();
    clie.append('ID_cliente', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', clie);
  }
  uno(id: number): Observable<ICliente> {
    var clie = new FormData();
    clie.append('ID_cliente', id.toString());
    return this.clientePhp.post<ICliente>(this.urlBase + 'uno', clie);
  }
  actualizar(cliente: ICliente, id: number): Observable<any> {
    var clie = new FormData();
    clie.append('ID_cliente', id.toString());
    clie.append('Nombre', cliente.Nombre);
    clie.append('Direccion', cliente.Direccion);
    clie.append('Telefono', cliente.Telefono);
    clie.append('Correo', cliente.Correo);
    return this.clientePhp.post(this.urlBase + 'actualizar', clie);
  }
}
