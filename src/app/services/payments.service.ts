import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API } from './constants';
import { CreatePaymentRequestDto, GetManyResponse, PaginationDto, PaymentRequest } from '../store/types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentsService extends ApiService {
	getPayments(admin: boolean, conditions: any, pagination: PaginationDto): Observable<GetManyResponse<PaymentRequest>> {
		const url = admin ? API.getManyPayments : API.getManyUserPayments
		return this.post(url, { body: { conditions, pagination } })
	}
	getPayment(id: string): Observable<PaymentRequest> {
		return this.get(API.payment(id))
	}
	createPaymentRequest(dto: CreatePaymentRequestDto): Observable<PaymentRequest> {
		return this.post(API.createPayment, { body: dto })
	}
	updatePayment(id: string, dto: { status: string }) {
		return this.patch(API.payment(id), { body: dto })
	}
}
