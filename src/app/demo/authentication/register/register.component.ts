
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AbsoluteLoaderComponent } from 'src/app/components/absolute-loader/absolute-loader.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterUserDto } from 'src/app/store/types';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		RouterModule, MatButtonModule, MatCheckboxModule,
		MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, AbsoluteLoaderComponent
	],
	templateUrl: './register.component.html',
	styleUrls: ['../login/login.component.scss']
})
export default class RegisterComponent implements OnInit {
	loading = false

	constructor(private authService: AuthService, private router:Router,private matSnackBar: MatSnackBar) {}

	registerInput: RegisterUserDto & { passwordRepeat: string } = {
		email: '', name: '', password: '', passwordRepeat: ''
	}
	registerForm!: FormGroup

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			name: new FormControl(this.registerInput.name, [
				Validators.required,
			]),
			email: new FormControl(this.registerInput.email, [
				Validators.email,
				Validators.required,
			]),
			password: new FormControl(this.registerInput.password, [
				Validators.required,
				Validators.minLength(8),
			]),
			passwordRepeat: new FormControl(this.registerInput.passwordRepeat, [
				Validators.required,
				(control: AbstractControl) => {
					const password = this.registerForm?.get('password')
					const passwordRepeat = this.registerForm?.get('passwordRepeat')

					return password?.value === passwordRepeat?.value ? null : { passwordMismatch: true };
				}
			])
		});

	}

	get name() { return this.registerForm.get('name'); }
	get email() { return this.registerForm.get('email'); }
	get password() { return this.registerForm.get('password'); }
	get passwordRepeat() { return this.registerForm.get('passwordRepeat'); }

	register() {
		if (!this.registerForm.valid) this.registerForm.markAsTouched()
		else {
			const dto = this.registerForm.getRawValue()
			const { email, name, password } = dto
			this.loading = true
			this.authService.register({ email, name, password }).subscribe(res => {
				this.loading = false
				if (res.email) {
					this.matSnackBar.open('Account created successfully', 'Ok', { duration: 4000, panelClass: 'mat-snack-success' })
					this.router.navigateByUrl('/login')
				}
			})
		}
	}
}
