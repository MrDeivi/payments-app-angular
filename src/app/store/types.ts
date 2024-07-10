export type User = {
	_id: string
	name: string
	email: string
	roles: Role[]
	createdAt: string
	balance: Balance[]
}

export type Balance = {
	balance: number
	currency: string
}

export type Role = {
	_id: string
	name: string
	permissions: string[]
}

export type PaymentRequest = {
	_id: string
	user: User
	paymentMethod: string
	status: PaymentStatusEnum
	amount: number
	currency: string
	failedReason: string
	createdAt: string
	updatedAt: string
}

export type CreatePaymentRequestDto = {
	paymentMethod: string
	amount: number
	currency: string
}


export enum PaymentStatusEnum {
	pending = "pending",
	queued = "queued",
	failed = "failed",
	success = "success",
}


export class LoginDto {
	email: string
	password: string
}

export class RegisterUserDto {
	email: string
	password: string
	name: string
}


export type PaginationDto = {
	page: number
	limit: number
}

export type Pagination = {
	totalElements: number,
	hasNextPage: boolean,
	nextPage: number
	previousPage: number
	lastPage: number
}


export type GetManyResponse<T = any> = {
	elements: T[]
	pagination: Pagination
}
