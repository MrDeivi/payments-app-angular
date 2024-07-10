import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { PaymentsTableComponent } from 'src/app/components/payment-table/payments-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/payments.service';
import { PaymentRequest } from 'src/app/store/types';
import { AbsoluteLoaderComponent } from 'src/app/components/absolute-loader/absolute-loader.component';
import { AuthStore } from 'src/app/store/auth.store';

@Component({
	selector: 'payment-detail',
	standalone: true,
	imports: [
		MatButtonModule,
		MatCardModule,
		CommonModule,
		SharedModule,
		BreadcrumbComponent,
		PaymentsTableComponent,
		AbsoluteLoaderComponent
	],
	templateUrl: './payment-detail.component.html',
})
export class PaymentDetailComponent implements OnInit {
	images = {
		"Credit Card": "assets/images/credit-card",
		"Paypal": "assets/images/paypal.svg",
		"Google Pay": "assets/images/googlepay.svg",
		"Coingate": "assets/images/coingate.svg",
	}
	id!: string;
	loading = false
	payment: PaymentRequest
	symbols = { USD: '$', EUR: '€', BTC: '₿' }

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private paymentsService: PaymentsService,
		private authStore: AuthStore
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id')!;
		this.getData()
	}

	getData() {
		this.loading = true
		this.paymentsService.getPayment(this.id).subscribe(res => {
			if (res.user._id !== this.authStore.user()._id && !this.authStore.user().roles.some(role => role.name === 'admin')) {
				this.router.navigateByUrl('/login')
			}
			this.loading = false
			this.payment = res
		})
	}
}
