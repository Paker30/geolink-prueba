import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BarraComponent } from './barra/barra.component';
import { AreaComponent } from './area/area.component';
import { GraficoComponent } from './grafico/grafico.component';
import { GeolinkComponent } from './geolink/geolink.component';
import { GeoBlinkHTTPService } from './services/http.service';
import sharedRoutes from './shared.routes';

@NgModule({
  imports: [
    BrowserModule,
    sharedRoutes
  ],
  declarations: [ BarraComponent, AreaComponent, GraficoComponent, GeolinkComponent ],
  exports: [ GeolinkComponent ],
  providers: [ GeoBlinkHTTPService ]
})
export class SharedModule {}
