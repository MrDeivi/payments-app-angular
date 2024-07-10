
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { PaymentsTableComponent } from 'src/app/components/payment-table/payments-table.component';
import { AuthStore } from 'src/app/store/auth.store';

@Component({
	selector: 'app-default',
	standalone: true,
	imports: [
		CommonModule,
		SharedModule,
		MatButtonModule,
		MatRippleModule,
		BreadcrumbComponent,
		PaymentsTableComponent,
		RouterModule
	],
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DefaultComponent {
	constructor( private authStore: AuthStore) {}

	get title() {
		return `Welcome back! ${this.user.name.split(' ')[0]}`
	}

	get user() {
		return this.authStore.user()
	}
	get userBalance() {
		return this.authStore.userBalance
	}
}
