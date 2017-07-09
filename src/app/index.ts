import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing, RootComponent } from './routes';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    SharedModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}
