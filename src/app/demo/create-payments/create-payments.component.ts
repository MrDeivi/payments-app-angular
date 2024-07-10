import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { AbsoluteLoaderComponent } from 'src/app/components/absolute-loader/absolute-loader.component';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { PaymentsService } from 'src/app/services/payments.service';
import { AuthStore } from 'src/app/store/auth.store';
import { CreatePaymentRequestDto } from 'src/app/store/types';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
	selector: 'create-payment-request',
	standalone: true,
	imports: [
		MatButtonModule,
		MatCardModule,
		CommonModule,
		SharedModule,
		BreadcrumbComponent,
		MatStepperModule,
		MatButtonModule,
		MatRippleModule,
		MatFormFieldModule,
		MatInputModule,
		AbsoluteLoaderComponent,
		RouterModule,
	],
	templateUrl: './create-payments.component.html',
})
export class CreatePaymentRequestComponent {
	symbols = { USD: '$', EUR: '€', BTC: '₿' }
	loading = false

	@ViewChild('stepper') private stepper!: MatStepper;

	constructor(private authStore: AuthStore, private paymentsService: PaymentsService, private matSnack: MatSnackBar) {}

	input: CreatePaymentRequestDto = {
		amount: 0, currency: 'USD', paymentMethod: ''
	}

	get userBalance() {
		return this.authStore.userBalance
	}

	create() {
		this.loading = true
		this.paymentsService.createPaymentRequest(this.input).subscribe(res => {
			this.loading = false
			if (res._id) {
				this.stepper.next()
			}
		})
	}
}
