import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import 'hammerjs';
import { UrlSerializer } from '@angular/router';
import { OutletUrlSerializer } from 'src/app/core/serializers/outlet-url.serializer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [
    { provide: UrlSerializer, useClass: OutletUrlSerializer }
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
