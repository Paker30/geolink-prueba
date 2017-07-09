import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'fountain-root',
  template: '<div class="geoblink-app"><router-outlet ></router-outlet></div>'
})
export class RootComponent {
  constructor() {}
}

export const routes: Routes = [
  {
    path: '',
    loadChildren: './shared/shared.module'
  }
];

export const routing = RouterModule.forRoot(routes);
