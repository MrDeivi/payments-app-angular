import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authStore: AuthStore, private router: Router, private route: ActivatedRoute) {}

	async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		const roles = (route.data as any).roles

		const isAuth = this.authStore.isAuthenticated()
		const can = roles?.length ? this.authStore.hasRoles(roles) : true

		if (isAuth && can) {
			return true;
		} else {
			const path = window.location.pathname.trim()
			if (path) {
				this.router.navigateByUrl(`/login?redirect=${path}`);
			} else {
				this.router.navigateByUrl(`/login`);
			}
			return false;
		}
	}
}
