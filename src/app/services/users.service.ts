import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetManyResponse, PaginationDto, User } from '../store/types';
import { ApiService } from './api.service';
import { API } from './constants';

@Injectable({ providedIn: 'root' })
export class UsersService extends ApiService {
	getUsers(conditions: any, pagination: PaginationDto): Observable<GetManyResponse<User>> {
		return this.post(API.gertManyUsers, { body: { conditions, pagination } })
	}

}
