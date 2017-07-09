import { RouterModule, Routes } from '@angular/router';
import { BarraComponent } from './barra/barra.component';
import { GraficoComponent } from './grafico/grafico.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/barra',
    pathMatch: 'full'
  },
  {
      path: 'barra',
      component: BarraComponent
  },
  {
      path: 'grafico',
      component: GraficoComponent
  }
];

export default RouterModule.forChild(routes);
