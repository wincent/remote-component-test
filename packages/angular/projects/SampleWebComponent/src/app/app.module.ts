import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {SomeAngularButtonComponent} from './some-angular-button/some-angular-button.component';

@NgModule({
	declarations: [SomeAngularButtonComponent],
	imports: [BrowserModule],
	providers: [],
	entryComponents: [SomeAngularButtonComponent],
})
export class AppModule {
	constructor(private injector: Injector) {
		const webComponent = createCustomElement(SomeAngularButtonComponent, {
			injector,
		});
		customElements.define('some-angular-button', webComponent);
	}

	ngDoBootstrap() {}
}
