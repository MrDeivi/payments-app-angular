import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto, RegisterUserDto, User } from '../store/types';
import { ApiService } from './api.service';
import { API } from './constants';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
	login(dto: LoginDto) {
		return this.post(API.login, { body: dto })
	}
	register(dto: RegisterUserDto): Observable<any> {
		return this.post(API.register, { body: dto })
	}
	getUserData(): Observable<User> {
		return this.get(API.getMe)
	}
	logout(): Observable<any> {
		return this.post(API.logout)
	}
	refreshToken(refreshToken): Observable<any> {
		return this.post(API.refreshSession, { headers: refreshToken })
	}
}
