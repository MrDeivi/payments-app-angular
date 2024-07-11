import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AbsoluteLoaderComponent } from 'src/app/components/absolute-loader/absolute-loader.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStore } from 'src/app/store/auth.store';
import { LoginDto } from 'src/app/store/types';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		RouterModule, MatButtonModule, MatCheckboxModule,
		MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, AbsoluteLoaderComponent
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
	loading = false

	constructor(
		private authService: AuthService,
		private authStore: AuthStore,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private matSnackBar: MatSnackBar
	) {}

	loginInput: LoginDto = {
		email: '', password: '',
	}
	loginForm!: FormGroup

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl(this.loginInput.email, [
				Validators.email,
				Validators.required,
			]),
			password: new FormControl(this.loginInput.password, [
				Validators.required,
			]),
		});

	}

	get email() { return this.loginForm.get('email'); }
	get password() { return this.loginForm.get('password'); }


	login() {
		if (!this.loginForm.valid) this.loginForm.markAsTouched()
		else {
			const dto = this.loginForm.getRawValue()
			const { email, password } = dto
			this.loading = true
			this.authService.login({ email, password }).subscribe(async res => {
				this.loading = false
				if (res.accessToken) {
					const { refreshToken, accessToken } = res
					this.authStore.saveUserData(accessToken, refreshToken)
					// const queryMap = await lastValueFrom(this.activatedRoute.queryParamMap)
					this.activatedRoute.queryParamMap.subscribe(val => {
						const redirectUrl = val.get('redirect')
						this.router.navigateByUrl(redirectUrl ?? '/dashboard')
					})
				}
			})
		}
	}
}
