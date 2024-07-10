import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AbsoluteLoaderComponent } from 'src/app/components/absolute-loader/absolute-loader.component';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { PaymentsService } from 'src/app/services/payments.service';
import { AuthStore } from 'src/app/store/auth.store';
import { TableStateType, getTableState } from './payment-table.state';
import { PaymentRequest } from 'src/app/store/types';

@Component({
	selector: 'app-payments-table',
	standalone: true,
	imports: [
		MatButtonModule, MatCardModule, CommonModule, SharedModule, BreadcrumbComponent, MatTableModule,
		MatPaginatorModule, MatButtonModule, MatIconModule, AbsoluteLoaderComponent, RouterModule,
		MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule
	],
	providers: [
		DatePipe
	],
	templateUrl: './payments-table.component.html',
	styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit {
	@Input() isAdminTable: boolean = true
	@Input() id: string
	@Input() showPagination: boolean = true
	displayedColumns: string[] = ['id', 'user', 'amount', 'paymentMethod', 'status', 'currency', 'date', 'operation'];
	loading = false
	editablePaymentId: string
	editablePaymentNewStatus: string

	state: WritableSignal<TableStateType>
	updateState: (data: Partial<TableStateType>) => void

	constructor(public authStore: AuthStore, private paymentsService: PaymentsService) {}
	ngOnInit(): void {
		const { state, updateState } = getTableState(this.id)
		this.state = state
		this.updateState = updateState

		if (!this.elements.length || !this.id) {
			this.getData()
		}
	}

	get elements() { return this.state().elements }
	get pagination() { return this.state().pagination }
	get paginationDto() { return this.state().paginationDto }


	getData() {
		this.loading = true

		this.paymentsService.getPayments(this.isAdminTable, {}, this.state().paginationDto).subscribe(res => {
			this.loading = false
			const { elements, pagination } = res
			this.updateState({ elements, pagination })
		})
	}

	changePage(data) {
		const { pageIndex, pageSize } = data
		this.updateState({ paginationDto: { limit: pageSize, page: pageIndex + 1 } })
		this.getData()
	}

	editElement(element: PaymentRequest) {
		this.editablePaymentId = element._id
		this.editablePaymentNewStatus = element.status
	}

	saveElement() {
		this.loading = true
		this.paymentsService.updatePayment(this.editablePaymentId, { status: this.editablePaymentNewStatus }).subscribe(res => {
			this.loading = false
			if (res._id) {
				this.getData()
				this.editablePaymentId = null
				this.editablePaymentNewStatus = null
			}
		})
	}
}
