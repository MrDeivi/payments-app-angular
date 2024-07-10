import { Injectable, signal } from "@angular/core";
import { User } from "./types";
import { jwtDecode } from "jwt-decode";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: 'root',
})
export class AuthStore {
	public user = signal<User | undefined>(undefined)
	public token = signal<string | undefined>(localStorage.getItem('auth_token'))
	public refreshToken = signal<string | undefined>(localStorage.getItem('refresh_token'))

	constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
		if (this.token()) {
			this.saveUserData(this.token())
			this.updateMe()
		}

		setInterval(async () => await this.verifyTokenExpiration(), 20000)
		this.verifyTokenExpiration()
	}

	get userBalance() {
		const balanceMap = {}
		const balance = this.user().balance

		for (const item of balance) {
			balanceMap[item.currency] = item.balance
		}

		return balanceMap
	}

	updateMe() {
		this.authService.getUserData().subscribe(res => {
			if (res._id) {
				this.user.set({ ...this.user(), ...res })
			}
		})
	}
	
	isAuthenticated() {
		const { isExpired } = this.isExpiredToken(localStorage.getItem('auth_token'))
		return !isExpired
	}

	hasRoles(roles: string[]) {
		return roles?.every(role => this.user().roles.some(rol => rol.name === role))
	}

	saveUserData(accessToken, refreshToken?) {
		try {
			this.token.set(accessToken)
			localStorage.setItem('auth_token', accessToken)

			if (refreshToken) {
				this.refreshToken.set(refreshToken)
				localStorage.setItem('refresh_token', refreshToken)
			}

			const decoded = jwtDecode(accessToken)
			this.user.set(decoded as any)
		} catch (err) {}
	}

	async verifyTokenExpiration() {
		const data: any = await lastValueFrom(this.route.data)
		const requiresAuth = data.requiresAuth

		const token = localStorage.getItem('auth_token')
		const { isExpired, isAboutToExpire } = this.isExpiredToken(token)

		if (!token || isExpired || isAboutToExpire) {
			const refreshToken = localStorage.getItem('refresh_token')
			if (!refreshToken && requiresAuth && isExpired) this.router.navigateByUrl('/login')
			else {
				const result = await this.authService.refreshToken(refreshToken).toPromise()
				if (result.accessToken) {
					const { accessToken, refreshToken } = result
					this.saveUserData(accessToken, refreshToken)
				} else if (requiresAuth && isExpired) {
					this.router.navigateByUrl('/login')
				}
			}
		}
	}

	isExpiredToken(token) {
		if (!token) return { isExpired: true }

		const decoded = jwtDecode(token)
		const exp = decoded.exp
		const date = new Date(exp * 1000)
		const isExpired = new Date() >= date
		const isAboutToExpire = new Date() >= new Date(exp * 1000 + 600000)

		return { isExpired, isAboutToExpire }
	}

	logout() {
		this.router.navigateByUrl('/login').then(() => {
			this.authService.logout().subscribe(res => {
				this.refreshToken.set(undefined)
				localStorage.removeItem('auth_token')
				localStorage.removeItem('refresh_token')
				this.user.set(undefined)
				this.token.set(undefined)
			})
		})

	}
}
