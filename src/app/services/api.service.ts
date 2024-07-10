import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { API, API_URL } from './constants';

@Injectable({ providedIn: 'root' })
export class ApiService extends CoreService {
	override get(url: string, options?: any) {
		return this.request('get', `${API_URL}/${url}`, { ...options, headers: this.getHeaders(options) })
	}
	override post(url: string, options?: any) {
		return this.request('post', `${API_URL}/${url}`, { ...options, headers: this.getHeaders(options) })
	}
	override patch(url: string, options?: any) {
		return this.request('patch', `${API_URL}/${url}`, { ...options, headers: this.getHeaders(options) })
	}
	override delete(url: string, options?: any) {
		return this.request('delete', `${API_URL}/${url}`, { ...options, headers: this.getHeaders(options) })
	}

	private getHeaders(options) {
		const headers = options?.headers ?? {}

		// replace auth_token for something more secure
		return { ...headers, 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
	}
}
