import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SomeAngularButtonComponent } from './some-angular-button/some-angular-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SomeAngularButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
