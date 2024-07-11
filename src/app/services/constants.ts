export const API_URL = 'https://api.payments.regiondev.org'

export const API = {
	// AUTH
	login: 'auth/login',
	register: 'auth/register',
	refreshSession: 'auth/refreshSession',
	logout: 'auth/logout',
	getMe: 'auth/me',

	// PAYMENTS
	getManyPayments: 'payment_request',
	payment: (id: string) => `payment_request/${id}`,
	createPayment: 'payment_request/create',
	getManyUserPayments: 'payment_request/user',

	// USERS
	gertManyUsers: 'users'
}
