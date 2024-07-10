
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr';

const config: SocketIoConfig = {
	url: 'http://localhost:3001', options: {
		path: '',
		reconnectionAttempts: 4,
		autoConnect: true,
		reconnectionDelay: 1000,
	}
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule,
		SocketIoModule.forRoot(config), ToastrModule.forRoot(),
	],
	bootstrap: [AppComponent],
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(),
		provideToastr({
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			closeButton: true,
			tapToDismiss: false,
			enableHtml: true
		}),
	]
})
export class AppModule {}
