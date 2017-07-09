import { RouterModule, Routes } from '@angular/router';
import { BarraComponent } from './barra/barra.component';
import { GraficoComponent } from './grafico/grafico.component';
import { GeolinkComponent } from './geolink/geolink.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/geolink',
    pathMatch: 'full'
  },
  {
      path: 'barra',
      component: BarraComponent
  },
  {
      path: 'grafico',
      component: GraficoComponent
  },
  {
    path: 'geolink',
    component: GeolinkComponent
  }
];

export default RouterModule.forChild(routes);
