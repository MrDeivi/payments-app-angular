import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { PaymentsTableComponent } from 'src/app/components/payment-table/payments-table.component';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'user-payments',
	standalone: true,
	imports: [
		MatButtonModule,
		MatCardModule,
		CommonModule,
		SharedModule,
		BreadcrumbComponent,
		PaymentsTableComponent,
		RouterModule
	],
	templateUrl: './user-payments.component.html',
	styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent {
	 
}
