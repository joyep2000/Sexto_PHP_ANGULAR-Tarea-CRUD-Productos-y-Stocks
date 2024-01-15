import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../Interfaces/iproducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlBase: string =
    'http://localhost/Sexto_PHP_ANGULAR/Inventario/Controllers/Producto.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<IProducto[]> {
    return this.clientePhp.get<IProducto[]>(this.urlBase + 'todos');
  }
  insertar(producto: IProducto): Observable<any> {
    var prov = new FormData();
    prov.append('Nombre', producto.Nombre);
    prov.append('Precio', producto.Precio.toString());
    prov.append('Cantidad', producto.Cantidad.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', prov);
  }
  eliminar(id: number): Observable<any> {
    var prov = new FormData();
    prov.append('productoId', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', prov);
  }
  uno(id: number): Observable<IProducto> {
    var prov = new FormData();
    prov.append('productoId', id.toString());
    return this.clientePhp.post<IProducto>(this.urlBase + 'uno', prov);
  }
  actualizar(producto: IProducto, id: number): Observable<any> {
    var prov = new FormData();
    prov.append('productoId', id.toString());
    prov.append('Nombre', producto.Nombre);
    prov.append('Precio', producto.Precio.toString());
    prov.append('Cantidad', producto.Cantidad.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', prov);
  }
}
