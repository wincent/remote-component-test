import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

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
  bootstrap: [AppComponent],
  entryComponents: [SomeAngularButtonComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(SomeAngularButtonComponent, {injector});
    customElements.define('some-angular-button', webComponent);
  }

  ngDoBootstrap() {
  }
}
