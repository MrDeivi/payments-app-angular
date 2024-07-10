import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of, throwError, timer } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

type RequestMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

@Injectable({
	providedIn: 'root',

})
export class CoreService {
	constructor(private http: HttpClient, private matSnackBar: MatSnackBar) {}

	protected request<T>(method: RequestMethod, url: string, options?: any, retriesCount: number = 3) {
		return this.http.request<T>(method, url, options).pipe(
			catchError((error: HttpErrorResponse) => this.handleError(error, method, url, options, retriesCount))
		);
	}

	private handleError(error: HttpErrorResponse, method, url, options, retriesCount: number) {
		console.log(retriesCount, 'retries left');

		if (this.shouldRetry(error, retriesCount)) {
			return this.handleRetry(method, url, options, retriesCount - 1);
		} else {
			console.log(error);
			const message = error.error?.message ?? error.statusText
			this.matSnackBar.open(`Error: ${message}`, 'Ok', { duration: 4000, panelClass: 'mat-snack-error' })

			throwError(() => error)

			return of({
				error: true,
				message: error.error?.message ?? error.message,
				status: error.status,
				statusText: error.statusText
			})
		}
	}

	private handleRetry(method, url, options, retriesLeft: number) {
		const delay = retriesLeft == 3 ? 5000 : 10000

		return timer(delay).pipe(
			mergeMap(() => this.request(method, url, options, retriesLeft)),
			catchError(() => EMPTY)
		);
	}

	private shouldRetry(error: HttpErrorResponse, retriesCount: number): boolean {
		if (retriesCount < 1) return false
		return error.status === 0 || (error.status >= 500 && error.status < 600)
	}

	get(url: string, options: any) {
		return this.request('get', url, options)
	}
	post(url: string, options: any) {
		return this.request('post', url, options)
	}
	patch(url: string, options: any) {
		return this.request('patch', url, options)
	}
	delete(url: string, options: any) {
		return this.request('delete', url, options)
	}
}
