import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { NuevoClienteComponent } from './views/clientes/nuevo-cliente/nuevo-cliente.component';
import { FacturasComponent } from './views/facturas/facturas.component';
import { NuevoFacturaComponent } from './views/facturas/nuevo-factura/nuevo-factura.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'clientes', component: ClientesComponent },
  {
    path: 'nuevo-cliente',
    component: NuevoClienteComponent,
  },
  {
    path: 'editar-cliente/:id',
    component: NuevoClienteComponent,
  },
  {
    path: 'facturas',
    component: FacturasComponent,
  },
  {
    path: 'nuevo-factura',
    component: NuevoFacturaComponent,
  },
  {
    path: 'editar-factura/:id',
    component: NuevoFacturaComponent,
  },

  { path: '**', component: PageNotFoundComponentComponent },
];
