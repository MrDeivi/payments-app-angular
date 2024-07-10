import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [],
	animations: [],
	hostDirectives:[]
})
export class AppComponent {
	title = 'payments-app';

	constructor(private Wb: WebSocketService) {
		Wb.subscribeMessages()
	}

}
