import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthStore } from '../store/auth.store';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService {
	constructor(private socket: Socket, private toastr: ToastrService, private authStore: AuthStore) {}

	subscribeMessages() {
		const description = {
			pending: 'Your payment is pending to process ',
			queued: 'Your payment is being proccesed',
			failed: 'Your payment failed',
			success: 'Your payment was proccesed',
		}

		const messages = {
			pending: 'Payment is pending',
			queued: 'Processing payment',
			failed: 'Payment failed',
			success: 'Payment proccesed',
		}

		this.socket.fromEvent('updatedPayment').pipe(map(data => data)).subscribe((data: any) => {
			const { status, _id, user } = data
			if (status) {
				const descriptionLink = `<a href="/payments/${_id}" style="color: blue !important">See Details</a>`
				const descMessage = `${description[status]} ${descriptionLink}`
				this.toastr.show(descMessage, messages[status], {
					enableHtml: true, timeOut: 10000, progressBar: true,
				})
			}
			if (user?._id === this.authStore.user()._id && status === 'success') {
				this.authStore.updateMe()
			}
		});
	}
}
